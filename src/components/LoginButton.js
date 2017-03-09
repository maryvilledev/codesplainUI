import React from 'react';
import { FlatButton } from 'material-ui';
import GitHubIcon from './github-icon.png';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`

const styles = {
  button: {
    marginTop: '6px',
  },
  img: {
    marginRight: '7px',
  },
}

const LoginButton = () => (
  <FlatButton 
    href={GITHUB_URL}
    style={styles.button}
    label={
      <span>
        <img 
          role="presentation"
          width="20" 
          style={styles.img} 
          src={GitHubIcon} 
        />
        Log In
      </span>
    }
  />
);

export default LoginButton
