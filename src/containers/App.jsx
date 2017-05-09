import React from 'react';

import AppBody from './AppBody';
import CodesplainAppBar from './CodesplainAppBar';
import NotificationSnackbar from '../components/NotificationSnackbar';

const styles = {
  container: { height: 'inherit' },
};

export const App = () => (
  <div style={styles.container}>
    <CodesplainAppBar />
    <AppBody />
    <NotificationSnackbar />
  </div>
);

export default App;
