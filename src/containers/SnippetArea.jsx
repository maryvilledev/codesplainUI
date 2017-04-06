import _ from 'lodash';
import { CardText, Snackbar } from 'material-ui';
import React, { PropTypes } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  parseSnippet,
  saveNew,
  saveExisting,
  setSnippetContents,
  setSnippetLanguage,
  setSnippetTitle,
  toggleEditState,
} from '../actions/app';
import {
  loadParser,
} from '../actions/parser';
import {
  setPermissions
} from '../actions/permissions';
import {
  openAnnotationPanel,
} from '../actions/annotation';

import ConfirmLockDialog from '../components/ConfirmLockDialog';
import Editor from '../components/Editor';
import SnippetAreaToolbar from '../components/SnippetAreaToolbar';

const API_URL = process.env.REACT_APP_API_URL;

const styles = {
  snippetAreaCardText: {
    display: 'flex',
    flexDirection: 'column',
    height: 'inherit',
  },
};

//Create an async function to fire the parseSnippet action
async function dispatchParseSnippet(snippet, dispatch) {
  dispatch(parseSnippet(snippet))
}
//Only fire the parse snippet action 400 millis after the last keydown
const debouncedParseSnippetDispatch = _.debounce(dispatchParseSnippet, 400)

export class SnippetArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lockDialogOpen: false,
      showSnackbar: false,
      snackbarMessage: '',
      titleErrorText: '',
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleGutterClick = this.handleGutterClick.bind(this);
    this.handleLanguageChanged = this.handleLanguageChanged.bind(this);
    this.handleLock = this.handleLock.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSaveAs = this.handleSaveAs.bind(this);
    this.handleSnippetChanged = this.handleSnippetChanged.bind(this);
    this.handleTitleChanged = this.handleTitleChanged.bind(this);
    this.handleToggleReadOnly = this.handleToggleReadOnly.bind(this);
    this.showSnackbar = this.showSnackbar.bind(this);
  }

  componentDidMount() {
    const { dispatch, snippetLanguage } = this.props;
    dispatch(loadParser(`${API_URL}/parsers/${snippetLanguage}`))
  }

  showSnackbar( message ) {
    this.setState({
      showSnackbar: true,
      snackbarMessage: message
    })
  }

  handleLanguageChanged(ev, key, language) {
    const { dispatch, snippetLanguage: currentLanguage } = this.props;
    if (currentLanguage !== language) {
      dispatch(setSnippetLanguage(language));
      dispatch(loadParser(`${API_URL}/parsers/${language}`));
    }
  }

  handleSnippetChanged(snippetContents) {
    const { dispatch, snippet } = this.props;
    dispatch(setSnippetContents(snippetContents));
    // Don't parse the snippet if a whitespace character was prepended/appended
    // Parsing should only be triggered if you add a non-whitespace char, or if
    // a whitespace was added in between non-WS chars (thus not being trimmed)
    if (snippet.trim() !== snippetContents.trim()) {
      debouncedParseSnippetDispatch(snippetContents, dispatch)
    }
  }

  handleTitleChanged(ev) {
    const snippetTitle = ev.target.value;
    const { dispatch } = this.props;
    dispatch(setSnippetTitle(snippetTitle));
  }

  handleLock() {
    this.setState({
      lockDialogOpen: true
    });
  }

  handleToggleReadOnly() {
    const { dispatch } = this.props;
    dispatch(toggleEditState());
    this.handleCloseModal();
  }

  handleCloseModal() {
    this.setState({
      lockDialogOpen: false
    });
  }

  handleSave() {
    // Make sure title is populated
    const {
      dispatch,
      router,
      snippetTitle,
    } = this.props;

    const { id } = router.params;

    if (!snippetTitle) {
      this.setState({ titleErrorText: 'This field is required' });
      this.showSnackbar('Please populate the title field before saving.');
      return;
    }
    this.setState({ titleErrorText: '' });

    // Make sure user is signed in
    const username = cookie.load('username');
    if (!username) {
      this.showSnackbar('Please login to save snippets.');
      return;
    }
     // Update a pre-existing snippet
    if (id) {
      return dispatch(saveExisting())
        .then(() => {
          this.showSnackbar('Codesplaination Saved!');
        }, () => {
          this.showSnackbar('Failed to save - an error occurred');
        });
    }
    return dispatch(saveNew())
      .then((snippetTitle) => {
        router.push(`/${username}/${snippetTitle}`);
        this.showSnackbar('Codesplaination Saved!');
      }, () => {
        this.showSnackbar('Failed to save - an error occurred');
      });
  }

  handleSaveAs(title) {
    // Make sure a title was specified
    if (!title) {
      return;
    }

    // Make sure user is signed in
    const username = cookie.load('username');
    if (!username) {
      this.showSnackbar('Please login to save snippets.');
      return;
    }

    const {
      dispatch,
      router,
    } = this.props;
    // Render the new title
    dispatch(setSnippetTitle(title));

    // Save the snippet
    return dispatch(saveNew())
      .then((snippetTitle) => {
        router.push(`/${username}/${snippetTitle}`);
        this.showSnackbar('Codesplaination Saved!');
        const permissions = {
          canRead: true,
          canEdit: true,
        } //All permission, this is now her file.
        dispatch(setPermissions(permissions));
      }, () => {
        this.showSnackbar('Failed to save - an error occurred');
      });
  }

  handleGutterClick(lineNumber, lineText) {
    const { dispatch } = this.props
    dispatch(openAnnotationPanel({lineNumber, lineText}))
  }

  render() {
    const {
      annotations,
      AST,
      filters,
      openLine,
      permissions,
      readOnly,
      snippet,
      snippetLanguage,
      snippetTitle,
    } = this.props;

    const markedLines = Object.keys(annotations).map((key) => Number(key))
    return (
      <CardText style={styles.snippetAreaCardText}>
        <SnippetAreaToolbar
          canSave={permissions.canEdit}
          language={snippetLanguage}
          onLanguageChange={this.handleLanguageChanged}
          onLockClick={this.handleLock}
          onSaveAsClick={this.handleSaveAs}
          onSaveClick={this.handleSave}
          onTitleChange={this.handleTitleChanged}
          readOnly={readOnly}
          saveEnabled={(cookie.load('username') !== undefined)}
          title={snippetTitle}
        />
        <ConfirmLockDialog
          accept={this.handleToggleReadOnly}
          isOpen={this.state.lockDialogOpen}
          reject={this.handleCloseModal}
        />
        <Editor
          AST={AST}
          filters={filters}
          language={snippetLanguage}
          markedLines={markedLines}
          onChange={this.handleSnippetChanged}
          onGutterClick={this.handleGutterClick}
          openLine={openLine}
          readOnly={readOnly}
          value={snippet}
        />
        <Snackbar
          autoHideDuration={3000}
          message={this.state.snackbarMessage}
          onRequestClose={() => this.setState({ showSnackbar: false })}
          open={this.state.showSnackbar}
        />
      </CardText>
    );
  }
}

SnippetArea.propTypes = {
  annotations: PropTypes.object.isRequired,
  AST: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  openLine: PropTypes.number,
  readOnly: PropTypes.bool.isRequired,
  snippet: PropTypes.string.isRequired,
  snippetTitle: PropTypes.string.isRequired,
  permissions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  annotations: state.app.annotations,
  AST: state.app.AST,
  filters: state.app.filters,
  snippetLanguage: state.app.snippetLanguage,
  openLine: (state.annotation.isDisplayingAnnotation
    ? state.annotation.snippetInformation.lineNumber
    : undefined),
  readOnly: state.app.readOnly,
  snippet: state.app.snippet,
  snippetTitle: state.app.snippetTitle,
  appState: state.app,
  permissions: state.permissions,
});

export default withRouter(connect(mapStateToProps)(SnippetArea));
