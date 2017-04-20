import React from 'react';
import {
  Card,
  CardActions,
  CardTitle,
  FlatButton,
} from 'material-ui';

import CodesplainAppBar from '../containers/CodesplainAppBar';

const styles = {
  card: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40%',
    textAlign: 'center',
  },
};

const NotFound = () => (
  <div>
    <CodesplainAppBar />
    <Card
      style={styles.card}
    >
      <CardTitle
        title="Resource not found"
      />
      <CardActions>
        <FlatButton
          fullWidth
          label="Home"
          onTouchTap={() => { window.location = '/'; }}
          primary
        />
      </CardActions>
    </Card>
  </div>
);

export default NotFound;
