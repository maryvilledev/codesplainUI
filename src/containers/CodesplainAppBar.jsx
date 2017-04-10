import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { withRouter } from 'react-router';
import cookie from 'react-cookie';

import { resetState } from '../actions/app';
import LoginButton from '../components/buttons/LoginButton'
import AppMenu from '../components/menus/AppMenu';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:org`

const styles = {
  title: {
    cursor: 'pointer',
  },
}

/*
<CodesplainAppBar /> renders as the banner located at the top of the screen. It
contains the text "Codesplain" on the far left, and either <AppMenu /> or
<LoginButton /> components on its right, depending on whether or not the user
has signed in with GitHub.
*/
export class CodesplainAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: cookie.load('token') !== undefined,
    }
    this.handleSignOut = this.handleSignOut.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.redirectToHomePage = this.redirectToHomePage.bind(this);
  }

  handleSignOut() {
    cookie.remove('token', { path: '/' });
    cookie.remove('username', { path: '/' });
    cookie.remove('userAvatarURL', { path: '/' });
    this.setState({ isLoggedIn: false });
    location.reload();
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

  redirectToHomePage() {
    const { dispatch, router } = this.props;
    dispatch(resetState());
    router.push('/');
  }

  render() {
    const rightElement = this.state.isLoggedIn ?
      <AppMenu onSignOut={this.handleSignOut} /> :
      <LoginButton onClick={this.onLoginClick}/>
    return (
      <AppBar
        showMenuIconButton={false}
        title="Codesplain"
        style={styles.title}
        onTitleTouchTap={this.redirectToHomePage}
        iconElementRight={rightElement}
      />
    );
  }
}

const mapStateToProps = state => ({
  appState: state.app,
})

export default withRouter(connect(mapStateToProps)(CodesplainAppBar));
