import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  AppBar,
  Dialog,
  FlatButton,
} from 'material-ui';
import { withRouter } from 'react-router';
import cookie from 'react-cookie';

import { updateUserSnippets } from '../actions/user';
import { resetState } from '../actions/app';
import { closeAnnotationPanel } from '../actions/annotation';
import LoginButton from '../components/buttons/LoginButton';
import AppMenu from '../components/menus/AppMenu';
import CustomPropTypes from '../util/custom-prop-types';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:org`;

const styles = {
  rightElement: {
    marginTop: '16px',
  },
  title: {
    cursor: 'pointer',
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
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(updateUserSnippets());
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
    cookie.remove('token', { path: '/' });
    cookie.remove('username', { path: '/' });
    cookie.remove('userAvatarURL', { path: '/' });
    this.setState({ isLoggedIn: false });
    location.reload();
  }

  handleSnippetSelected(key) {
    const username = cookie.load('username');
    window.location = `/${username}/${key}`;
    const { router } = this.props;
    router.push(`/${username}/${key}`);
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

    const { userSnippets } = this.props;
    const rightElement = this.state.isLoggedIn ?
      (<AppMenu
        onSignOut={this.handleSignOut}
        onTitleClicked={this.handleSnippetSelected}
        snippetTitles={userSnippets}
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
          showMenuIconButton={false}
          title={titleElement}
          iconElementRight={rightElement}
          iconStyleRight={styles.rightElement}
        />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.isDialogOpen}
          onRequestClose={this.handleDialogClose}
        >
          Discard unsaved changes?
        </Dialog>
      </div>
    );
  }
}

CodesplainAppBar.propTypes = {
  hasUnsavedChanges: PropTypes.bool.isRequired,
  userSnippets: CustomPropTypes.snippets,
};

CodesplainAppBar.defaultProps = {
  userSnippets: {},
};

const mapStateToProps = (state) => {
  const {
    app,
    user: {
      userSnippets,
    },
  } = state;
  return {
    hasUnsavedChanges: app.hasUnsavedChanges,
    appState: app,
    userSnippets,
  };
};

export default withRouter(connect(mapStateToProps)(CodesplainAppBar));
