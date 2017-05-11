import React, { PropTypes } from 'react';
import _ from 'lodash';
import {
  Card,
  CardText,
} from 'material-ui';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cookie from 'react-cookie';

import { openAnnotationPanel } from '../actions/annotation';
import {
  parseSnippet,
  saveNew,
  saveExisting,
  setSnippetContents,
  setSnippetKey,
  setSnippetLanguage,
  setSnippetTitle,
  toggleEditState,
} from '../actions/app';
import { addNotification } from '../actions/notifications';
import { loadParser } from '../actions/parser';
import { setPermissions } from '../actions/permissions';
import { updateUserSnippets, switchOrg } from '../actions/user';
import ConfirmLockDialog from '../components/ConfirmLockDialog';
import Editor from '../components/Editor';
import SnippetAreaToolbar from '../components/SnippetAreaToolbar';
import CustomPropTypes from '../util/custom-prop-types';
import { fetchUserAvatar } from '../util/requests';

const styles = {
  cardText: {
    display: 'flex',
    flexDirection: 'column',
    height: 'inherit',
    overflow: 'auto',
  },
  card: {
    height: '100%',
    flex: '2 1 auto',
    zIndex: 'auto',
  },
  cardContainer: {
    height: 'inherit',
  },
};

// Create an async function to fire the parseSnippet action
async function dispatchParseSnippet(snippet, dispatch) {
  dispatch(parseSnippet(snippet));
}
// Only fire the parse snippet action 400 millis after the last keydown
const debouncedParseSnippetDispatch = _.debounce(dispatchParseSnippet, 400);

export class SnippetArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lockDialogOpen: false,
      avatarUrl: '',
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
    this.handleOrgChanged = this.handleOrgChanged.bind(this);
  }

  componentDidMount() {
    const { dispatch, snippetLanguage } = this.props;
    dispatch(loadParser(snippetLanguage));
  }

  componentWillReceiveProps(nextProps) {
    const { author } = this.props;
    const token = cookie.load('token');
    if (!nextProps.author || !token) {
      return;
    }
    if (author !== nextProps.author) {
      fetchUserAvatar(nextProps.author, token)
        .then(avatarUrl => this.setState({ avatarUrl }));
    }
  }

  handleLanguageChanged(ev, key, language) {
    const { dispatch, snippetLanguage: currentLanguage } = this.props;
    if (currentLanguage !== language) {
      dispatch(setSnippetLanguage(language));
      dispatch(loadParser(language));
    }
  }

  handleSnippetChanged(snippetContents) {
    const { dispatch, snippet } = this.props;
    dispatch(setSnippetContents(snippetContents));
    // Don't parse the snippet if a whitespace character was prepended/appended
    // Parsing should only be triggered if you add a non-whitespace char, or if
    // a whitespace was added in between non-WS chars (thus not being trimmed)
    if (snippet.trim() !== snippetContents.trim()) {
      debouncedParseSnippetDispatch(snippetContents, dispatch);
    }
  }

  handleTitleChanged(ev) {
    const snippetTitle = ev.target.value;
    if (snippetTitle.length > 40) {
      return;
    }
    const { dispatch } = this.props;
    dispatch(setSnippetTitle(snippetTitle));
  }

  handleLock() {
    this.setState({
      lockDialogOpen: true,
    });
  }

  handleToggleReadOnly() {
    const { dispatch } = this.props;
    dispatch(toggleEditState());
    this.handleCloseModal();
  }

  handleCloseModal() {
    this.setState({
      lockDialogOpen: false,
    });
  }

  handleSave() {
    const {
      dispatch,
      router,
      snippetTitle,
      selectedOrg,
    } = this.props;

    const { id } = router.params;

    // Make sure title is populated
    if (!snippetTitle) {
      dispatch(addNotification('Please enter a Snippet Name'));
      return;
    }

     // Update a pre-existing snippet
    if (id) {
      dispatch(saveExisting())
        .then(() => {
          dispatch(updateUserSnippets());
        });
    } else {
      // Save a new snippet
      dispatch(saveNew(selectedOrg))
        .then((snippetKey) => {
          // Redirect the user to the snippet's page
          router.push(`/${selectedOrg}/${snippetKey}`);
          // Update the snippet's key
          dispatch(setSnippetKey(snippetKey));
          dispatch(updateUserSnippets());
        });
    }
  }

  handleSaveAs(title) {
    // Make sure a title was specified
    if (!title) {
      return;
    }

    const {
      dispatch,
      router,
      selectedOrg,
    } = this.props;

    // Render the new title
    dispatch(setSnippetTitle(title));

    // Save the snippet
    dispatch(saveNew(selectedOrg))
      .then((snippetKey) => {
        // Redirect the user to the snippet's page
        router.push(`/${selectedOrg}/${snippetKey}`);
        // Update the snippet's key
        dispatch(setSnippetKey(snippetKey));
        const permissions = {
          canRead: true,
          canEdit: true,
        }; // Grant all permissions, this is now her file.
        dispatch(setPermissions(permissions));
        dispatch(updateUserSnippets());
      });
  }

  handleOrgChanged(org) {
    const { dispatch } = this.props;
    dispatch(switchOrg(org));
  }

  handleGutterClick(lineNumber, lineText) {
    const { dispatch } = this.props;
    dispatch(openAnnotationPanel({ lineNumber, lineText }));
  }

  render() {
    const {
      annotations,
      AST,
      filters,
      openLine,
      orgs,
      canEdit,
      errors,
      readOnly,
      selectedOrg,
      snippet,
      snippetLanguage,
      snippetTitle,
      username,
      author,
    } = this.props;
    const { avatarUrl } = this.state;

    const markedLines = Object.keys(annotations).map(key => Number(key));
    return (
      <Card
        containerStyle={styles.cardContainer}
        style={styles.card}
      >
        <CardText style={styles.snippetAreaCardText}>
          <SnippetAreaToolbar
            canSave={canEdit}
            language={snippetLanguage}
            onLanguageChange={this.handleLanguageChanged}
            onLockClick={this.handleLock}
            onOrgChanged={this.handleOrgChanged}
            onSaveAsClick={this.handleSaveAs}
            onSaveClick={this.handleSave}
            onTitleChange={this.handleTitleChanged}
            orgs={orgs}
            readOnly={readOnly}
            saveEnabled={Boolean(username)}
            selectedOrg={selectedOrg}
            title={snippetTitle}
            avatarUrl={avatarUrl}
            author={author}
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
            errors={errors}
          />
        </CardText>
      </Card>
    );
  }
}

SnippetArea.propTypes = {
  annotations: CustomPropTypes.annotations.isRequired,
  filters: CustomPropTypes.filters.isRequired,
  openLine: PropTypes.number,
  readOnly: PropTypes.bool.isRequired,
  snippet: PropTypes.string.isRequired,
  snippetTitle: PropTypes.string.isRequired,
  errors: CustomPropTypes.errors,
  snippetLanguage: PropTypes.string.isRequired,
  orgs: CustomPropTypes.orgs.isRequired,
  selectedOrg: PropTypes.string,
  username: PropTypes.string,
  canEdit: PropTypes.bool.isRequired,
  author: PropTypes.string,
};

SnippetArea.defaultProps = {
  openLine: -1,
  selectedOrg: '',
  errors: [],
  username: '',
  author: '',
};

const mapStateToProps = (state) => {
  const {
    annotation: {
      isDisplayingAnnotation,
      lineAnnotated,
    },
    app: {
      annotations,
      AST,
      filters,
      snippetLanguage,
      readOnly,
      snippet,
      snippetTitle,
    },
    permissions: {
      canEdit,
      author,
    },
    parser: {
      errors,
    },
    user: {
      orgs,
      selectedOrg,
      username,
    },
  } = state;
  return {
    annotations,
    AST,
    filters,
    snippetLanguage,
    openLine: (isDisplayingAnnotation ? lineAnnotated.lineNumber : undefined),
    readOnly,
    snippet,
    snippetTitle,
    errors,
    orgs,
    selectedOrg,
    username,
    canEdit,
    author,
  };
};

export default withRouter(connect(mapStateToProps)(SnippetArea));
