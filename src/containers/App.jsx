import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppBody from './AppBody';
import Auth from '../components/Auth'
import CodesplainAppBar from './CodesplainAppBar';
import { Router, Route, browserHistory } from 'react-router'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export class App extends Component {
  render() {
    const component = (props) => (
      <div className="container-fluid">
        <CodesplainAppBar />
        <AppBody {...props}/>
      </div>
    )
    const auth = (props) => (
        <Auth {...props}/>
    )
    return (
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/auth"  component={auth} />
          <Router path="/" component={component} />
          <Route path="/(:username)/snippets/(:id)" component={component} />
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
