import React from 'react';

import AppBody from '../containers/AppBody';
import CodesplainAppBar from '../containers/CodesplainAppBar';
import NotificationSnackbar from './NotificationSnackbar';

export const App = () => (
  <div className="container-fluid">
    <CodesplainAppBar />
    <AppBody />
    <NotificationSnackbar />
  </div>
);

export default App;
