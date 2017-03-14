import React from 'react'
import axios from 'axios'
import cookie from 'react-cookie'
import Loading from './Loading'
import Alert from './Alert'

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
  }

  componentDidMount() {
    // Extract the code provided by GitHub from the redirect query string
    const { code } = this.props.location.query

    // Post it to the express backend to be verified by GitHub as authentic
    axios.post('/api/auth', { code })
      .then(res => {
        // Code was accepted, so extract and save the token from the response
        const { token } = res.data;
        cookie.save('token', token, { path: '/' });

        // Return Promise to get the user's basic info
        return axios.get('https://api.github.com/user', {
          headers: {
            Accept: 'application/json',
            Authorization: `token ${token}`,
          }
        })
      }, err => {
        // If this fails, we need to make sure the error dialog shows
        console.error(err);
        this.setState({ waiting: false, error: true });
      })
      .then(res => {
        const { avatar_url } = res.data; // Can pull lots of other stuff
                                         // out of res.data if needed
        cookie.save('userAvatarURL', avatar_url, { path: '/' });
        this.setState({ waiting: false });
      }, err => {
        // Failed to pull in user info, but that's fine. Log and continue.
        console.log(err);
        this.setState({ waiting: false });
      })
      .catch(err => console.log(err))
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

export default Auth
