import React from 'react';
import AppBar from 'material-ui/AppBar';
import { browserHistory } from 'react-router';

const styles = {
  title: {
    cursor: 'pointer',
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
  />
);

export default CodesplainAppBar;
