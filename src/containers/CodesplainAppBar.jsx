import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  AppBar,
  Dialog,
  FlatButton,
} from 'material-ui';
import { withRouter } from 'react-router';
import cookie from 'react-cookie';

import { closeAnnotationPanel } from '../actions/annotation';
import {
  resetState,
  setSnippetTitle,
 } from '../actions/app';
import {
  fetchGist,
  fetchGists,
} from '../actions/gists';
import { addNotification } from '../actions/notifications';
import { setAuthor } from '../actions/permissions';
import {
  fetchSnippetLists,
  fetchUserInfo,
  fetchUserOrgs,
  saveAccessToken,
  switchOrg,
} from '../actions/user';
import LoginButton from '../components/buttons/LoginButton';
import AppMenu from '../components/menus/AppMenu';
import CustomPropTypes from '../util/custom-prop-types';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:org`;

const styles = {
  appBar: {
    background: '#333333', // light black
  },
  rightElement: {
    marginTop: '16px',
  },
  title: {
    color: '#00e6e6', // tealish
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

/*
<CodesplainAppBar /> renders as the banner located at the top of the screen. It
contains the text "Codesplain" on the far left, and either <AppMenu /> or
<LoginButton /> components on its right, depending on whether or not the user
has signed in with GitHub.
*/
export class CodesplainAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isDialogOpen: false,
    };
    this.fetchUserAccountInfo = this.fetchUserAccountInfo.bind(this);
    this.handleConfirmNavigation = this.handleConfirmNavigation.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleImportGist = this.handleImportGist.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleSnippetSelected = this.handleSnippetSelected.bind(this);
    this.handleTitleTouchTap = this.handleTitleTouchTap.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.redirectToHomePage = this.redirectToHomePage.bind(this);
    this.resetApplication = this.resetApplication.bind(this);
  }

  componentDidMount() {
    this.fetchUserAccountInfo();
  }

  onLoginClick() {
    const {
      appState,
      router,
    } = this.props;
    // Saves a cookie containing the current URL path, so we can retrieve it
    // later when GitHub sends the user back to the app, and send the user back
    // to the page they were on when they clicked the login button.
    const body = JSON.stringify(appState);
    cookie.save('signInState', body, { path: '/' });
    cookie.save('signInRedirect', router.location.pathname, { path: '/' });

    // Send the user to the GitHub OAuth authorization URL, where the client ID
    // is set to the CLIENT_ID env var.
    // This does not use the router to route the user to Github because
    // router is used for routing within the application, not the entire web
    window.location = GITHUB_URL;
  }

  fetchUserAccountInfo() {
    const { dispatch, token, router, username } = this.props;
    const tokenCookie = cookie.load('token');

    // Save token to state if it hasn't already been (by <Auth />)
    if (!token && tokenCookie) {
      dispatch(saveAccessToken(tokenCookie));
    }

    // If we have a token and don't have the user's account info already, fetch
    // it & save to state.
    if (tokenCookie && !username) {
      dispatch(fetchUserInfo())
        .then(() => { this.setState({ isLoggedIn: true }); })
        .then(() => dispatch(fetchUserOrgs()))
        .then(() => dispatch(fetchSnippetLists()))
        .then(() => dispatch(fetchGists()))
        .catch((err) => {
          // If we fail, token must have been invalid:
          // remove it and redirect to home page
          if (err.response.status === 401) {
            this.resetApplication();
            this.setState({ isLoggedIn: false });
            cookie.remove('token', { path: '/' });
            router.push('/');
          } else {
            dispatch(addNotification('Error fetching user information'));
          }
        });
    }
  }

  handleDialogClose() {
    this.setState({ isDialogOpen: false });
  }

  handleSignOut() {
    const { router } = this.props;
    this.resetApplication();
    cookie.remove('token', { path: '/' });
    this.setState({ isLoggedIn: false });
    router.push('/');
    location.reload();
  }

  handleSnippetSelected(snippetOwner, snippetKey) {
    const { router } = this.props;
    this.resetApplication();
    router.push(`/${snippetOwner}/${snippetKey}`);
  }

  handleTitleTouchTap() {
    const { hasUnsavedChanges } = this.props;

    if (hasUnsavedChanges) {
      // Confirm navigation from user
      this.setState({ isDialogOpen: true });
    } else {
      this.redirectToHomePage();
    }
  }

  handleConfirmNavigation() {
    // Close the dialog
    this.handleDialogClose();
    // Redirect the user to the home page
    this.redirectToHomePage();
  }

  handleImportGist(name, url) {
    const { dispatch } = this.props;
    this.redirectToHomePage();
    dispatch(setSnippetTitle(name));
    dispatch(fetchGist(url))
      .then(() => { this.redirectToHomePage(); });
  }

  resetApplication() {
    const { dispatch, username } = this.props;

    // Reset state
    dispatch(resetState());
    dispatch(setAuthor(''));
    // Reset the selected "organization" to the user's account
    dispatch(switchOrg(username));
    // Close the annotation panel
    dispatch(closeAnnotationPanel());
  }

  redirectToHomePage() {
    const { router } = this.props;
    this.resetApplication();
    // If the user is not already at the home page, redirect them to it
    if (router.location.pathname !== '/') {
      router.push('/');
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleDialogClose}
        secondary
      />,
      <FlatButton
        label="Discard"
        onTouchTap={this.handleConfirmNavigation}
        primary
      />,
    ];

    const { avatarUrl, orgSnippets, username, userSnippets, gists } = this.props;
    const { isDialogOpen, isLoggedIn } = this.state;
    const rightElement = isLoggedIn ?
      (<AppMenu
        avatarUrl={avatarUrl}
        gists={gists}
        onImportGist={this.handleImportGist}
        onSignOut={this.handleSignOut}
        onSnippetSelected={this.handleSnippetSelected}
        orgSnippets={orgSnippets}
        username={username}
        userSnippets={userSnippets}
      />)
      : <LoginButton onClick={this.onLoginClick} />;
    const titleElement = (
      <span
        onClick={this.handleTitleTouchTap}
        style={styles.title}
      >
        Codesplain
      </span>
    );

    return (
      <div>
        <AppBar
          iconElementRight={rightElement}
          iconStyleRight={isLoggedIn ? styles.rightElement : {}}
          showMenuIconButton={false}
          style={styles.appBar}
          title={titleElement}
        />
        <Dialog
          actions={actions}
          modal={false}
          open={isDialogOpen}
          onRequestClose={this.handleDialogClose}
        >
          Discard unsaved changes?
        </Dialog>
      </div>
    );
  }
}

CodesplainAppBar.propTypes = {
  avatarUrl: PropTypes.string,
  gists: CustomPropTypes.gists,
  hasUnsavedChanges: PropTypes.bool.isRequired,
  orgSnippets: CustomPropTypes.orgSnippets,
  token: PropTypes.string,
  username: PropTypes.string,
  userSnippets: CustomPropTypes.snippets,
};

CodesplainAppBar.defaultProps = {
  avatarUrl: '',
  gists: [],
  orgSnippets: {},
  token: '',
  username: '',
  userSnippets: {},
};

const mapStateToProps = (state) => {
  const {
    app,
    app: {
      hasUnsavedChanges,
    },
    user: {
      avatarUrl,
      orgSnippets,
      token,
      username,
      userSnippets,
    },
    gists,
  } = state;
  return {
    appState: app,
    avatarUrl,
    gists,
    hasUnsavedChanges,
    orgSnippets,
    token,
    username,
    userSnippets,
  };
};

export const ConnectedAppBar = connect(mapStateToProps)(CodesplainAppBar);

export default withRouter(ConnectedAppBar);
