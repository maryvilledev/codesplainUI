import axios from 'axios';
import _ from 'lodash';
import { CardText, Snackbar } from 'material-ui';
import React, { PropTypes } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import {
  clearUnsavedChanges,
  parseSnippet,
  setSnippetContents,
  setSnippetTitle,
  toggleEditState,
} from '../actions/app';
import {
  loadParser
} from '../actions/parser';

import {
  openAnnotationPanel,
} from '../actions/annotation';

import ConfirmLockDialog from '../components/ConfirmLockDialog';
import Editor from '../components/Editor';
import SnippetAreaToolbar from '../components/SnippetAreaToolbar';

const API_URL = process.env.REACT_APP_API_URL;

const styles = {
  snippetAreaCardText: {
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

    this.showSnackbar = this.showSnackbar.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleGutterClick = this.handleGutterClick.bind(this);
    this.handleLock = this.handleLock.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSaveAs = this.handleSaveAs.bind(this);
    this.handleSnippetChanged = this.handleSnippetChanged.bind(this);
    this.handleTitleChanged = this.handleTitleChanged.bind(this);
    this.handleToggleReadOnly = this.handleToggleReadOnly.bind(this);
  }

  showSnackbar( message ) {
    this.setState({
      showSnackbar: true,
      snackbarMessage: message
    })
  }

  handleSnippetChanged(snippetContents) {
    const { dispatch } = this.props;
    dispatch(setSnippetContents(snippetContents));
    debouncedParseSnippetDispatch(snippetContents, dispatch)
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
      appState,
      dispatch,
      id,
      snippetTitle,
    } = this.props;

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

    // Save the snippet
    const stateString = JSON.stringify(appState);
    const token = cookie.load('token');
    const config = {
      headers: {
        'Authorization': token,
      }
    }
    if (id) { // if we're updating an existing snippet...
      axios.put(`${API_URL}/users/${username}/snippets/${id}`, stateString, config)
        .then(res => {
          this.showSnackbar('Codesplaination Saved!');
          dispatch(clearUnsavedChanges());
        }, err => {
          this.showSnackbar('Failed to save - an error occurred');
        })
    }
    else { // if we're saving a new snippet...
      axios.post(`${API_URL}/users/${username}/snippets`, stateString, config)
        .then((res) => {
          browserHistory.push(`/${username}/snippets/${res.data.key}`);
          this.showSnackbar('Codesplaination Saved!');
          dispatch(clearUnsavedChanges());
        }, (err) => {
          this.showSnackbar('Failed to save - an error occurred');
        });
    }
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

    // Render the new title
    const {
      appState,
      dispatch,
    } = this.props;
    dispatch(setSnippetTitle(title));

    // Save the snippet
    appState.snippetTitle = title;
    const stateString = JSON.stringify(appState);
    const token = cookie.load('token');
    const config = {
      headers: {
        'Authorization': token,
      }
    }
    axios.post(`${API_URL}/users/${username}/snippets`, stateString, config)
      .then((res) => {
        browserHistory.push(`/${username}/snippets/${res.data.key}`);
        this.showSnackbar('Codesplaination Saved!');
        dispatch(clearUnsavedChanges());
      }, (err) => {
        this.showSnackbar('Failed to save - an error occurred');
      });
  }

  handleGutterClick(lineNumber, lineText) {
    const { dispatch } = this.props
    dispatch(openAnnotationPanel({lineNumber, lineText}))
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadParser(`${process.env.REACT_APP_API_URL}/parsers/python3`))
  }

  render() {
    const {
      annotations,
      AST,
      filters,
      openLine,
      readOnly,
      snippet,
      snippetTitle,
    } = this.props;

    const markedLines = Object.keys(annotations).map((key) => Number(key))

    return (
      <CardText style={styles.snippetAreaCardText}>
        <SnippetAreaToolbar
          title={snippetTitle}
          onTitleChange={this.handleTitleChanged}d
          readOnly={readOnly}
          onLockClick={this.handleLock}
          onSaveClick={this.handleSave}
          onSaveAsClick={this.handleSaveAs}
        />
        <ConfirmLockDialog
          accept={this.handleToggleReadOnly}
          isOpen={this.state.lockDialogOpen}
          reject={this.handleCloseModal}
        />
        <Editor
          AST={AST}
          filters={filters}
          markedLines={markedLines}
          onChange={this.handleSnippetChanged}
          onGutterClick={this.handleGutterClick}
          openLine={openLine}
          readOnly={readOnly}
          value={snippet}
        />
        <Snackbar
          open={this.state.showSnackbar}
          message={this.state.snackbarMessage}
          autoHideDuration={3000}
          onRequestClose={() => this.setState({ showSnackbar: false })}
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
};

const mapStateToProps = state => ({
  annotations: state.app.annotations,
  AST: state.app.AST,
  filters: state.app.filters,
  openLine: (state.annotation.isDisplayingAnnotation
    ? state.annotation.snippetInformation.lineNumber
    : undefined),
  readOnly: state.app.readOnly,
  snippet: state.app.snippet,
  snippetTitle: state.app.snippetTitle,
  appState: state.app,
});

export default connect(mapStateToProps)(SnippetArea);
