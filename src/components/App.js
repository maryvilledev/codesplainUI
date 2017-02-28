import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppBody from './AppBody';
import CodesplainAppBar from './CodesplainAppBar';
import { Router, Route, browserHistory } from 'react-router'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  render() {
    const component = (props) => (
      <MuiThemeProvider>
        <div
          className="container-fluid"
        >
          <CodesplainAppBar />
          <AppBody {...props}/>
        </div>
      </MuiThemeProvider>
    )
    return (
      <Router history={browserHistory}>
        <Route path="/(:id)" component={component} />
      </Router>
    );
  }
}

export default App;
