import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { saveUserSnippets, updateUserSnippets } from '../actions/app';

import LoginButton from '../components/buttons/LoginButton'
import AppMenu from '../components/menus/AppMenu';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:org`;

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
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.fetchUserSnippets = this.fetchUserSnippets.bind(this);
  }

  componentDidMount() {
    // const token = cookie.load('token');
    // const username = cookie.load('username');
    // this.fetchUserSnippets(token, username);
    const { dispatch } = this.props;
    dispatch(updateUserSnippets())
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

  // Get meta data about the user's snippets and save to redux
  async fetchUserSnippets(token, username) {
    const { dispatch } = this.props;
    // let res;
    // try {
    //   const headers = {
    //     Accept: 'application/json',
    //     Authorization: `token ${token}`,
    //   };
    //   res = await axios.get(`${API_URL}/users/${username}/snippets`, { headers });
    // } catch(e) {
    //   return;
    // }
    const snippetMeta = {
      'test_snippet_1': {
        snippetName: 'Test Snippet 1',
        language:    'Python 3',
        lastEdited:  '2017-04-05T12:52:20.099Z',
        'private':   true,
      },
      'test_snippet_1': {
        snippetName: 'Test Snippet 2',
        language:    'Python 3',
        lastEdited:  '2017-04-05T12:52:20.099Z',
        'private':   true,
      }
    };

    dispatch(saveUserSnippets(snippetMeta));
  }

  render() {
    const { snippetMeta } = this.props.appState;
    const titles = snippetMeta ? 
      Object.entries(snippetMeta).map(snippet => snippet.snippetName)
      :
      null;
    const rightElement = this.state.isLoggedIn ?
      <AppMenu
        onSignOut={this.handleSignOut}
        snippetTitles={titles}
        onTitleClicked={this.handleTitleClick}
      />
      :
      <LoginButton
        onClick={this.onLoginClick}
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
