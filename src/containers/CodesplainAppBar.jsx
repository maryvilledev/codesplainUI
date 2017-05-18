import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  AppBar,
  Dialog,
  FlatButton,
} from 'material-ui';
import { withRouter } from 'react-router';
import cookie from 'react-cookie';


import { setGists } from '../actions/gists';
import { fetchGists, fetchGist } from '../util/requests';

import {
  addOrg,
  addOrganizations,
  fetchSnippetLists,
  fetchUserInfo,
  fetchUserOrgs,
  saveAccessToken,
  saveUsername,
  setAvatarUrl,
  switchOrg,
} from '../actions/user';
import {
  resetState,
  setSnippetContents,
  setSnippetTitle,
 } from '../actions/app';
import { closeAnnotationPanel } from '../actions/annotation';
import { setAuthor } from '../actions/permissions';
import LoginButton from '../components/buttons/LoginButton';
import AppMenu from '../components/menus/AppMenu';
import CustomPropTypes from '../util/custom-prop-types';
import SnippetMenu from '../components/menus/SnippetMenu';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:org`;

const styles = {
  appBar: {
    background: '#333333', // light black
    height: '60px',
  },
  titleWrapper: {
    display: 'inline-flex',
    flexGrow: '0',
    flexBasis: 'auto',
  },
  iconStyleRight: {
    margin: '0',
    width: '100%',
  },
  title: {
    cursor: 'pointer',
    color: '#00e6e6', // tealish
    fontWeight: 'bold',
    marginRight: '50px',
  },
  rightSection: {
    margin: 0,
    padding: 0,
    height: '100%',
    width: '100%',
  },
  appMenu: {
    display: 'inline-flex',
    float: 'right',
    height: '100%',
    alignItems: 'center',
  },
  snippetMenu: {
    display: 'inline-flex',
    height: '100%',
    alignItems: 'center',
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
      isLoggedIn: cookie.load('token') !== undefined,
      isDialogOpen: false,
    };
    this.handleConfirmNavigation = this.handleConfirmNavigation.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleSnippetSelected = this.handleSnippetSelected.bind(this);
    this.handleTitleTouchTap = this.handleTitleTouchTap.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.redirectToHomePage = this.redirectToHomePage.bind(this);
    this.handleImportGist = this.handleImportGist.bind(this);
  }

  componentDidMount() {
    const { dispatch, token, router } = this.props;
    const tokenCookie = cookie.load('token');

    // Save token to state if it hasn't already been (by <Auth />)
    if (!token && tokenCookie) {
      dispatch(saveAccessToken(tokenCookie));
    }

    // If we have a token (thus are logged in), get user's info & save to state
    if (tokenCookie) {
      dispatch(fetchUserOrgs())
        .then(({ data }) => {
          // Dispatch orgs to state
          // Create a list of the names organizations the user belongs to
          const orgs = data.map(org => org.login);
          // Save the organizations list to the store
          dispatch(addOrganizations(orgs));
          return dispatch(fetchUserInfo());
        })
        .then(({ data }) => {
          const { login: username, avatar_url: userAvatarURL } = data;
          dispatch(saveUsername(username));
          dispatch(setAvatarUrl(userAvatarURL));

          // Add user's username to orgs list, and select it as default
          dispatch(addOrg(username));
          dispatch(switchOrg(username));
          fetchGists(tokenCookie)
            .then(gists => dispatch(setGists(gists)));
          return dispatch(fetchSnippetLists());
        })
        .catch(() => {
          // If we fail, token must have been invalid:
          // remove it and redirect to home page
          cookie.remove('token', { path: '/' });
          router.push('/');
        });
    }
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

  handleSignOut() {
    const { router } = this.props;
    cookie.remove('token', { path: '/' });
    this.setState({ isLoggedIn: false });
    router.push('/');
    location.reload();
  }

  handleSnippetSelected(snippetOwner, snippetKey) {
    const { router } = this.props;
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

  redirectToHomePage() {
    const {
      dispatch,
      router,
    } = this.props;

    // Reset state
    dispatch(resetState());
    dispatch(setAuthor(''));
    // Close the annotation panel
    dispatch(closeAnnotationPanel());
    // If the user is not already at the home page, redirect them to it
    if (router.location.pathname !== '/') {
      router.push('/');
    }
  }

  handleDialogClose() {
    this.setState({ isDialogOpen: false });
  }

  handleConfirmNavigation() {
    // Close the dialog
    this.handleDialogClose();
    // Redirect the user to the home page
    this.redirectToHomePage();
  }

  handleImportGist(name, url) {
    const { dispatch } = this.props;
    dispatch(setSnippetTitle(name));
    fetchGist(url).then(contents => dispatch(setSnippetContents(contents)));
    this.redirectToHomePage();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="Discard"
        primary
        onTouchTap={this.handleConfirmNavigation}
      />,
    ];

    const { avatarUrl, orgSnippets, username, userSnippets, gists } = this.props;
    const { isDialogOpen, isLoggedIn } = this.state;
    const appMenu = isLoggedIn ?
      (<AppMenu
        avatarUrl={avatarUrl}
        onSignOut={this.handleSignOut}
        onSnippetSelected={this.handleSnippetSelected}
        orgSnippets={orgSnippets}
        username={username}
        userSnippets={userSnippets}
        gists={gists}
        onImportGist={this.handleImportGist}
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
    const rightSection = (
      <div style={styles.rightSection}>
        <div style={styles.snippetMenu}>
          <SnippetMenu
            username={username}
            userSnippets={userSnippets}
            orgSnippets={orgSnippets}
            onSnippetSelected={this.handleSnippetSelected}
            onHoverBackground="#595959"
            borderBottomColor={styles.title.color}
          />
        </div>
        <div style={styles.appMenu}>
          {appMenu}
        </div>
      </div>
    );

    return (
      <div>
        <AppBar
          style={styles.appBar}
          titleStyle={styles.titleWrapper}
          showMenuIconButton={false}
          title={titleElement}
          iconElementRight={rightSection}
          iconStyleRight={styles.iconStyleRight}
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
  hasUnsavedChanges: PropTypes.bool.isRequired,
  orgSnippets: CustomPropTypes.orgSnippets,
  token: PropTypes.string,
  username: PropTypes.string,
  userSnippets: CustomPropTypes.snippets,
  gists: CustomPropTypes.gists,
};

CodesplainAppBar.defaultProps = {
  avatarUrl: '',
  orgSnippets: {},
  token: '',
  username: '',
  userSnippets: {},
  gists: [],
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
    hasUnsavedChanges,
    appState: app,
    orgSnippets,
    userSnippets,
    username,
    token,
    avatarUrl,
    gists,
  };
};

export default withRouter(connect(mapStateToProps)(CodesplainAppBar));
