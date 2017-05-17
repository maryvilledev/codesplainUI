import React, { PropTypes } from 'react';
import { FlatButton } from 'material-ui';

import GitHubIcon from '../../../res/github-icon.png';

const styles = {
  button: {
    marginTop: '6px',
  },
  img: {
    marginRight: '7px',
    marginBottom: '4px',
  },
  span: {
    color: 'white',
    display: 'inline-flex',
    alignItems: 'center',
  },
};

const LoginButtonLabel = (
  <span style={styles.span}>
    <img
      alt=""
      src={GitHubIcon}
      style={styles.img}
      width="25px"
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

LoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoginButton;
