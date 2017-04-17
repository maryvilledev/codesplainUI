import React from 'react';

import AppBody from './AppBody';
import CodesplainAppBar from './CodesplainAppBar';

export const App = () => (
  <div className="container-fluid">
    <CodesplainAppBar />
    <AppBody />
  </div>
);

export default App;
