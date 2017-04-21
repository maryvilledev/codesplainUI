import React from 'react';

import AppBody from './AppBody';
import CodesplainAppBar from './CodesplainAppBar';

export const App = () => (
  <div style={{ height: 'inherit' }}>
    <CodesplainAppBar />
    <AppBody />
  </div>
);

export default App;
