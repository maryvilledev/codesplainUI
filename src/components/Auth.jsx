import React from 'react'
import axios from 'axios'
import cookie from 'react-cookie'
import { CircularProgress } from 'material-ui'

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
        this.setState({ waiting: false });
      })
      .catch((err) => {
        // Something went wrong ;(
        console.error(err);
        this.setState({ waiting: false });
      });

    // Load the URL to redirect user to
    const signInRedirect = cookie.load('signInRedirect');
    if (signInRedirect)
      this.setState({ signInRedirect });
    else
      this.setState({ signInRedirect: '/' });
  }

  render() {
    // Conditionally render a <CircularProgress /> or redirect user, depending
    // on whether the backend has responded yet
    if (this.state.waiting)
      return <CircularProgress size={100} thickness={7} />
    else
      window.location = this.state.signInRedirect;
  }
}

export default Auth
