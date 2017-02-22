import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppBody from './AppBody';
import CodesplainAppBar from './CodesplainAppBar';
import SnippetArea from './SnippetArea';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <div>
            <CodesplainAppBar />
            <AppBody></AppBody>
            <SnippetArea />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
