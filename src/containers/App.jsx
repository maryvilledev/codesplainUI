import React, { Component } from 'react';

import AppBody from './AppBody';
import CodesplainAppBar from '../components/CodesplainAppBar';

export class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <CodesplainAppBar />
        <AppBody {...this.props}/>
      </div>
    );
  }
}

export default App;
