import React from 'react';
import AppBar from 'material-ui/AppBar';
import { browserHistory } from 'react-router';

import LoginButton from './LoginButton'

const styles = {
  title: {
    cursor: 'pointer',
  },
  button: {
    color: 'white',
    fontSize: '16pt'
  }
}

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const CodesplainAppBar = () => (
  <AppBar
    showMenuIconButton={false}
    title="Codesplain"
    style={styles.title}
    onTitleTouchTap={() => {
      browserHistory.push('/');
      location.reload();
    }}
    iconElementRight={<LoginButton style={styles.button}/>}
  />
);

export default CodesplainAppBar;
