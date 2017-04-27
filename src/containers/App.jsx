import React from 'react';

import AppBody from './AppBody';
import CodesplainAppBar from './CodesplainAppBar';
import NotificationSnackbar from '../components/NotificationSnackbar';

export const App = () => (
  <div className="container-fluid">
    <CodesplainAppBar />
    <AppBody />
    <NotificationSnackbar />
  </div>
);

export default App;
