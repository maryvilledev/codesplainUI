import React from 'react';
import cookie from 'react-cookie';
import axios from 'axios';
import { withRouter } from 'react-router';

import Loading from '../components/Loading';
import Alert from '../components/Alert';

const API_URL = process.env.REACT_APP_API_URL;
export const errors = {
  badCode: 'Failed to login with GitHub, sorry.',
  badOrg: 'Sorry, you are not a member of an organization authorized to use' +
  ' this application.',
};

const resolveErrorMessage = (status) => {
  switch (status) {
  case 403: {
    return errors.badOrg;
  }
    // eslint-disable-next-line
    case 400: //Intentional fallthrough
  default: {
    return errors.badCode;
  }
  }
};

/*
<Auth /> is the component that is rendered for the '{{url}}/auth' endpoint (which
is the endpoint the user is sent to after signing in to GitHub). It initially
renders as a <CircularProgress /> and sends a POST request to the express backend
to complete the OAuth authentication with GitHub. Upon completion of this, the
user is redirected to the URL they attempted to login from initially.
*/
export class Auth extends React.Component {
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
    const { code } = this.props.router.location.query;
    this.runLoginSequence(code);
  }

  async runLoginSequence(authCode) {
    // Use authorization code to get access token from API
    const token = await this.fetchAccessToken(authCode);
    if (!token) {
      return;
    }

    // Now get their username, and save other basic info to cookies
    await this.fetchUserInfo(token);
  }

  // Returns access token if successful, otherwise returns undefined
  async fetchAccessToken(authCode) {
    let res;
    try {
      res = await axios.post(`${API_URL}/auth`, { code: authCode });
    } catch (err) {
      const error = resolveErrorMessage(err.response.status);
      this.setState({ waiting: false, error });
      return undefined;
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
    } catch (err) {
      const error = resolveErrorMessage(err.response.status);
      this.setState({ waiting: false, error });
      return;
    }
    // Can pull lots of other stuff out of res.data if needed
    const { login, avatar_url } = res.data;
    cookie.save('userAvatarURL', avatar_url, { path: '/' });
    cookie.save('username', login, { path: '/' });
    this.setState({ waiting: false });
  }

  redirectUser() {
    const {
      router,
    } = this.props;
    // Load the URL to redirect user to, default to the
    // home page if non exists
    const signInRedirect = cookie.load('signInRedirect');
    if (signInRedirect) {
      router.push(signInRedirect);
    } else {
      router.push('/');
    }
  }

  render() {
    // Conditionally render a <CircularProgress /> or redirect user, depending
    // on whether the backend has responded yet
    if (this.state.waiting) {
      return <Loading text="Logging in..." />;
    }
      // We're done waiting, now render an alert if
      // the login attempt failed
    if (this.state.error) {
      return (
        <Alert
          text={this.state.error}
          onClose={this.redirectUser}
        />
      );
    }
        // Otherwise, it succeeded, so just redirect the user
    this.redirectUser();
    return null;
  }
}

export default withRouter(Auth);
