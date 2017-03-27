import React from 'react';
import { FlatButton } from 'material-ui';

import GitHubIcon from '../../../res/github-icon.png';

const styles = {
  button: {
    marginTop: '6px',
  },
  img: {
    marginRight: '7px',
  },
  span: {
    color: 'white',
  },
};

const LoginButtonLabel = (
  <span style={styles.span}>
    <img
      alt=''
      src={GitHubIcon}
      style={styles.img}
      width="23"
    />
    Log In
  </span>
);

/*
<LoginButton /> renders as white clickable "LOG IN" text, with a white octocat
icon to its left.
*/

const LoginButton = ({ onClick }) => (
  <FlatButton
    label={LoginButtonLabel}
    onClick={onClick}
    style={styles.button}
  />
);

export default LoginButton;
