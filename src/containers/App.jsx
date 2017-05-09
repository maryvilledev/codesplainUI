import React from 'react';

import AppBody from './AppBody';
import CodesplainAppBar from './CodesplainAppBar';
import NotificationSnackbar from '../components/NotificationSnackbar';
import ReferenceArea from '../components/ReferenceArea';

const styles = {
  container: {
    height: 'inherit',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
  },
};

export const App = () => (
  <div style={styles.container}>
    <CodesplainAppBar />
    <AppBody />
    <ReferenceArea />
    <NotificationSnackbar />
  </div>
);

export default App;
