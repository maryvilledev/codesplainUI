import React from 'react';
import { FlatButton } from 'material-ui';
import cookie from 'react-cookie'
import GitHubIcon from '../../../res/github-icon.png';

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

/*
<LoginButton /> renders as white clickable "LOG IN" text, with a white octocat
icon to its left.
*/
const LoginButton = ({ onClick }) => (
  <FlatButton 
    onClick={onClick}
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
