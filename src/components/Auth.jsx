import React from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';

import {
  fetchAccessToken,
  saveAccessToken,
  fetchUserInfo,
  saveUsername,
} from '../actions/user';
import Loading from '../components/Loading';
import Alert from '../components/Alert';

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
    this.state = {
      waiting: true,
    };
    this.login = this.login.bind(this);
    this.redirectUser = this.redirectUser.bind(this);
  }

  componentDidMount() {
    // Extract the code provided by GitHub from the redirect query string
    const { code } = this.props.router.location.query;
    this.login(code);
  }

  login(authCode) {
    const { dispatch } = this.props;
    dispatch(fetchAccessToken(authCode))
      .then((res) => {
        const { token, orgs } = res.data;
        dispatch(saveAccessToken(token));
        cookie.save('token', token, { path: '/' });
        cookie.save('orgs', _.join(orgs, ' '), { path: '/' });
      })
      .then(() => dispatch(fetchUserInfo()))
      .then((res) => {
        const { login: username, avatar_url: userAvatarURL } = res.data;
        dispatch(saveUsername(username));
        cookie.save('userAvatarURL', userAvatarURL, { path: '/' });
        cookie.save('username', username, { path: '/' });
        this.setState({ waiting: false });
      })
      .catch((err) => {
        const errorMessage = resolveErrorMessage(err.response.status);
        this.setState({
          error: errorMessage,
          waiting: false,
        });
      });
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

export const ConnectedAuth = connect()(Auth);

export default withRouter(ConnectedAuth);
