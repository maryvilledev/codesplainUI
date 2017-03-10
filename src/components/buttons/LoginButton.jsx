import React from 'react';
import { FlatButton } from 'material-ui';
import GitHubIcon from '../../../res/github-icon.png';
import cookie from 'react-cookie'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`

const styles = {
  button: {
    marginTop: '6px',
  },
  span: {
    color: 'white',
  },
  img: {
    marginRight: '7px',
  },
}

// Saves a cookie containing the current URL path, so we can retrieve it
// later when GitHub sends the user back to the app, and send the user back
// to the page they were on when they clicked this button.
const saveSignInRedirect = () => {
  cookie.save('signInRedirect', location.pathname, { path: '/' });
}

/*
<LoginButton /> renders as white clickable "LOG IN" text, with a white octocat
icon to its left. When clicked, the button sends the user to the GitHub OAuth 
authorization URL, where the client ID is set to the CLIENT_ID env var.
*/
const LoginButton = () => (
  <FlatButton 
    href={GITHUB_URL}
    onClick={saveSignInRedirect}
    style={styles.button}
    label={
      <span style={styles.span}>
        <img 
          role="presentation"
          width="23" 
          style={styles.img} 
          src={GitHubIcon} 
        />
        Log In
      </span>
    }
  />
);

export default LoginButton
