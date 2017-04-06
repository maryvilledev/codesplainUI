import React from 'react';
import cookie from 'react-cookie';
import axios from 'axios';
import { connect } from 'react-redux';

import Loading from '../components/Loading';
import Alert from '../components/Alert';

const API_URL = process.env.REACT_APP_API_URL;

/*
<Auth /> is the component that is rendered for the '{{url}}/auth' endpoint (which
is the endpoint the user is sent to after signing in to GitHub). It initially
renders as a <CircularProgress /> and sends a POST request to the express backend
to complete the OAuth authentication with GitHub. Upon completion of this, the
user is redirected to the URL they attempted to login from initially.
*/
class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { waiting: true };
    this.redirectUser = this.redirectUser.bind(this);
    this.runLoginSequence = this.runLoginSequence.bind(this);
    this.fetchAccessToken = this.fetchAccessToken.bind(this);
    this.fetchUserInfo = this.fetchUserInfo.bind(this);
  }

  componentDidMount() {
    // Extract the code provided by GitHub from the redirect query string
    const { code } = this.props.location.query
    this.runLoginSequence(code);
  }

  async runLoginSequence(authCode) {
    // Use authorization code to get access token from API
    const token = await this.fetchAccessToken(authCode);
    if (!token) {
      this.setState({ waiting: false, error: true });
      return;
    }

    // Now get their username, and save other basic info to cookies
    const username = await this.fetchUserInfo(token);
    if (!username) {
      this.setState({ waiting: false, error: true });
      return;
    }
  }

  // Returns access token if successful, otherwise returns undefined
  async fetchAccessToken(authCode) {
    let res;
    try {
      res = await axios.post(`${API_URL}/auth`, { code: authCode });
    } catch(e) {
      return; // can't keep going so bail out
    }

    // Code was accepted, so extract and save the token from the response
    const { token } = res.data;
    cookie.save('token', token, { path: '/' });
    return token;
  }

  // Returns username if successful, otherwise returns undefined
  async fetchUserInfo(token) {
    // Get the user's basic info
    let res;
    try {
      const headers = {
        Accept: 'application/json',
        Authorization: `token ${token}`,
      };
      res = await axios.get('https://api.github.com/user', { headers });
    } catch(e) {
      return; // it didn't work, so bail out
    }
    // Can pull lots of other stuff out of res.data if needed
    const { login, avatar_url } = res.data;
    cookie.save('userAvatarURL', avatar_url, { path: '/' });
    cookie.save('username', login, { path: '/' });
    this.setState({ waiting: false });
    return login;
  }

  redirectUser() {
    // Load the URL to redirect user to, default to the
    // home page if non exists
    const signInRedirect = cookie.load('signInRedirect');
    if (signInRedirect) {
      window.location = signInRedirect;
    } else {
      window.location = '/';
    }
  }

  render() {
    // Conditionally render a <CircularProgress /> or redirect user, depending
    // on whether the backend has responded yet
    if (this.state.waiting) {
      return <Loading text="Logging in..." />
    } else {
      // We're done waiting, now render an alert if
      // the login attempt failed
      if (this.state.error) {
        return (
          <Alert
            text="Failed to login with GitHub, sorry."
            onClose={this.redirectUser}
          />
        );
      } else {
        // Otherwise, it succeeded, so just redirect the user
        this.redirectUser();
        return null;
      }
    }
  }
}

export default connect()(Auth);
