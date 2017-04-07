import React, { Component } from 'react';

import AppBody from './AppBody';
import CodesplainAppBar from './CodesplainAppBar';

export class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <CodesplainAppBar />
        <AppBody/>
      </div>
    );
  }
}

export default App;
