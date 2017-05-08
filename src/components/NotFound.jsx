import React from 'react';
import {
  Card,
  CardActions,
  CardTitle,
  FlatButton,
} from 'material-ui';
import { withRouter } from 'react-router';

const styles = {
  card: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40%',
    textAlign: 'center',
  },
};

const NotFound = ({ router }) => (
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
        onTouchTap={() => router.push('/')}
        primary
      />
    </CardActions>
  </Card>
);

export default withRouter(NotFound);
