import React, { PropTypes } from 'react';
import _ from 'lodash';
import {
  Card,
  CardText,
} from 'material-ui';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { openAnnotationPanel } from '../actions/annotation';
import {
  deleteSnippet,
  parseSnippet,
  resetState,
  saveExisting,
  saveNew,
  setSnippetContents,
  setSnippetKey,
  setSnippetLanguage,
  setSnippetTitle,
  toggleEditState,
} from '../actions/app';
import { addNotification } from '../actions/notifications';
import { loadParser } from '../actions/parser';
import { setPermissions, setAuthor } from '../actions/permissions';
import {
  fetchSnippetLists,
  switchOrg,
  updateUserSnippets,
} from '../actions/user';
import ConfirmationDialog from '../components/ConfirmationDialog';
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
    zIndex: 'auto',
  },
  cardContainer: {
    display: 'inline-flex',
    flexFlow: 'column nowrap',
    height: 'inherit',
    justifyContent: 'flex-start',
    paddingBottom: 0,
    width: '100%',
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
      deleteDialogOpen: false,
      avatarUrl: '',
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleGutterClick = this.handleGutterClick.bind(this);
    this.handleLanguageChanged = this.handleLanguageChanged.bind(this);
    this.handleLock = this.handleLock.bind(this);
    this.handleOrgChanged = this.handleOrgChanged.bind(this);
    this.handleOrgChanged = this.handleOrgChanged.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSaveAs = this.handleSaveAs.bind(this);
    this.handleSnippetChanged = this.handleSnippetChanged.bind(this);
    this.handleTitleChanged = this.handleTitleChanged.bind(this);
    this.handleToggleReadOnly = this.handleToggleReadOnly.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
  }

  componentDidMount() {
    const { dispatch, snippetLanguage } = this.props;
    dispatch(loadParser(snippetLanguage));
  }

  componentWillReceiveProps(nextProps) {
    const {
      author,
      avatarUrl: loggedInUserAvatarUrl,
      username: loggedInUser,
      token,
    } = this.props;

    if (!nextProps.author || !token) {
      this.setState({ avatarUrl: '' });
      return;
    }
    if (author !== nextProps.author) {
      // The URL to the user's avatar is already in the store, so if the snippet
      // is owned by the current user, then use the URL in the store instead
      // of pinging Github's API for it.
      if (loggedInUser === nextProps.author) {
        this.setState({
          avatarUrl: loggedInUserAvatarUrl,
        });
        return;
      }
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

  showDeleteModal() {
    this.setState({ deleteDialogOpen: true });
  }

  handleCloseModal() {
    this.setState({
      lockDialogOpen: false,
      deleteDialogOpen: false,
    });
  }

  handleSave() {
    const {
      dispatch,
      router,
      selectedOrg,
      snippetTitle,
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

  handleDelete() {
    this.setState({ deleteDialogOpen: false });
    const { dispatch, snippetKey, router } = this.props;
    dispatch(deleteSnippet(snippetKey))
      .then(() => {
        dispatch(resetState());
        dispatch(setAuthor(''));
        dispatch(updateUserSnippets());
        dispatch(fetchSnippetLists()); // Update org snippet lists
        router.push('/'); // TODO: Test that does not redirect delete fails
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
      author,
      canEdit,
      errors,
      filters,
      openLine,
      orgs,
      readOnly,
      selectedOrg,
      snippet,
      snippetKey,
      snippetLanguage,
      snippetTitle,
      username,
    } = this.props;
    const { avatarUrl } = this.state;
    const markedLines = Object.keys(annotations).map(Number);
    // Delete button is enabled only when user is logged in, owns snippet,
    // and is not viewing a new snippet
    const deleteEnabled = Boolean(snippetKey && canEdit && username);
    return (
      <Card
        containerStyle={styles.cardContainer}
        id="app-body-snippet-area"
        style={styles.card}
      >
        <CardText style={styles.cardText}>
          <SnippetAreaToolbar
            author={author}
            avatarUrl={avatarUrl}
            canEdit={canEdit}
            deleteEnabled={deleteEnabled}
            language={snippetLanguage}
            onDeleteClick={this.showDeleteModal}
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
          />
          <ConfirmationDialog
            accept={this.handleToggleReadOnly}
            isOpen={this.state.lockDialogOpen}
            message="Note that you will not be able to revert back to edit mode"
            reject={this.handleCloseModal}
            title="Are you sure you want to lock editing?"
          />
          <ConfirmationDialog
            accept={this.handleDelete}
            isOpen={this.state.deleteDialogOpen}
            message="Note that you can not undo this action"
            reject={this.handleCloseModal}
            title="Are you sure you want to delete this snippet?"
          />
          <Editor
            AST={AST}
            errors={errors}
            filters={filters}
            language={snippetLanguage}
            markedLines={markedLines}
            onChange={this.handleSnippetChanged}
            onGutterClick={this.handleGutterClick}
            openLine={openLine}
            readOnly={readOnly}
            value={snippet}
          />
        </CardText>
      </Card>
    );
  }
}

SnippetArea.propTypes = {
  annotations: CustomPropTypes.annotations.isRequired,
  author: PropTypes.string,
  avatarUrl: PropTypes.string,
  canEdit: PropTypes.bool.isRequired,
  errors: CustomPropTypes.errors,
  filters: CustomPropTypes.filters.isRequired,
  openLine: PropTypes.number,
  orgs: CustomPropTypes.orgs.isRequired,
  readOnly: PropTypes.bool.isRequired,
  selectedOrg: PropTypes.string,
  snippet: PropTypes.string.isRequired,
  snippetKey: PropTypes.string,
  snippetLanguage: PropTypes.string.isRequired,
  snippetTitle: PropTypes.string.isRequired,
  token: PropTypes.string,
  username: PropTypes.string,
};

SnippetArea.defaultProps = {
  author: '',
  avatarUrl: '',
  errors: [],
  openLine: -1,
  selectedOrg: '',
  snippetKey: '',
  token: '',
  username: '',
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
      readOnly,
      snippet,
      snippetKey,
      snippetLanguage,
      snippetTitle,
    },
    permissions: {
      author,
      canEdit,
    },
    parser: {
      errors,
    },
    user: {
      avatarUrl,
      orgs,
      selectedOrg,
      token,
      username,
    },
  } = state;
  return {
    annotations,
    AST,
    author,
    avatarUrl,
    canEdit,
    errors,
    filters,
    openLine: (isDisplayingAnnotation ? lineAnnotated.lineNumber : undefined),
    orgs,
    readOnly,
    selectedOrg,
    snippet,
    snippetKey,
    snippetLanguage,
    snippetTitle,
    token,
    username,
  };
};

export default withRouter(connect(mapStateToProps)(SnippetArea));
