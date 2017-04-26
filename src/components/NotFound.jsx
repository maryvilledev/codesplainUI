import React from 'react';
import {
  Card,
  CardActions,
  CardTitle,
  FlatButton,
} from 'material-ui';

const styles = {
  card: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40%',
    textAlign: 'center',
  },
};

const NotFound = () => (
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
);

export default NotFound;
