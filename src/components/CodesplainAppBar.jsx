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

/*
<CodesplainAppBar /> renders as the banner located at the top of the screen. It 
contains the text "Codesplain" on the far left, and either <AppMenu /> or
<LoginButton /> components on its right, depending on whether or not the user
has signed in with GitHub.
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
    const rightElement = this.state.isLoggedIn ?
                            <AppMenu onSignOut={this.handleSignOut} /> :
                            <LoginButton />
    return (
      <AppBar
        showMenuIconButton={false}
        title="Codesplain"
        style={styles.title}
        onTitleTouchTap={() => {
          browserHistory.push('/');
          location.reload();
        }}
        iconElementRight={rightElement}
      />
    );
  }

}

export default CodesplainAppBar;
