import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppBody from '../components/AppBody';
import CodesplainAppBar from '../components/CodesplainAppBar';
import { Router, Route, browserHistory } from 'react-router'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  render() {
    const component = (props) => (
      <div className="container-fluid">
        <CodesplainAppBar />
        <AppBody {...props}/>
      </div>
    )
    return (
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/(:id)" component={component} />
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
