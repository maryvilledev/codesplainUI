import React from 'react';
import AppBar from 'material-ui/AppBar';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

import LoginButton from './buttons/LoginButton'
import AppMenu from './AppMenu';

const styles = {
  title: {
    cursor: 'pointer',
  },
}

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
class CodesplainAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: cookie.load('token') !== undefined,
    }
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    cookie.remove('token');
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <AppBar
        showMenuIconButton={false}
        title="Codesplain"
        style={styles.title}
        onTitleTouchTap={() => {
          browserHistory.push('/');
          location.reload();
        }}
        iconElementRight={ 
          this.state.isLoggedIn ?
          <AppMenu onSignOut={this.handleSignOut} /> :
          <LoginButton />
        }
      />
    );
  }

}

export default CodesplainAppBar;
