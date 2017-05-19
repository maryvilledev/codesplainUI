import React from 'react';

import AppBody from '../containers/AppBody';
import CodesplainAppBar from '../containers/CodesplainAppBar';
import NotificationSnackbar from './NotificationSnackbar';
import ReferenceArea from './ReferenceArea';

const styles = {
  container: {
    height: 'inherit',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    overflow: 'auto',
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
