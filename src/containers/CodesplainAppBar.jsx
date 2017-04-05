import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

import LoginButton from '../components/buttons/LoginButton'
import AppMenu from '../components/menus/AppMenu';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:org`;
const API_URL = process.env.API_URL;

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
class CodesplainAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: cookie.load('token') !== undefined,
    }
    this.handleSignOut = this.handleSignOut.bind(this);
    this.fetchSnippetTitles = this.fetchSnippetTitles.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
  }

  handleSignOut() {
    cookie.remove('token', { path: '/' });
    cookie.remove('username', { path: '/' });
    cookie.remove('userAvatarURL', { path: '/' });
    this.setState({ isLoggedIn: false });
    location.reload();
  }

  handleTitleClick(title) {
    console.log(`${title} was clicked`);
  }

  onLoginClick() {
    // Saves a cookie containing the current URL path, so we can retrieve it
    // later when GitHub sends the user back to the app, and send the user back
    // to the page they were on when they clicked the login button.
    const appState = JSON.stringify(this.props.appState);
    cookie.save('signInState', appState, { path: '/' });
    cookie.save('signInRedirect', location.pathname, { path: '/' });

    // Send the user to the GitHub OAuth authorization URL, where the client ID
    // is set to the CLIENT_ID env var.
    window.location = GITHUB_URL;
  }

  render() {
    // const rightElement = this.state.isLoggedIn ?
    //   <AppMenu onSignOut={this.handleSignOut} /> :
    //   <LoginButton onClick={this.onLoginClick}/>
    const snippetTitles = this.appState.userSnippets.map(s => s.snippetName);
    const rightElement =
    <AppMenu
      onSignOut={this.handleSignOut}
      snippetTitles={snippetTitles}
      onTitleClicked={this.handleTitleClick}
    />;
    return (
      <AppBar
        showMenuIconButton={false}
        title="Codesplain"
        style={styles.title}
        onTitleTouchTap={() => {
          browserHistory.push('/');
          location.reload();
        }}
        iconElementRight={rightElement}
      />
    );
  }
}

const mapStateToProps = state => ({
  appState: state.app,
})

export default connect(mapStateToProps)(CodesplainAppBar);
