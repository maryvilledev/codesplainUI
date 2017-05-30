import React, { PropTypes } from 'react';
import {
  CardActions,
  FlatButton,
} from 'material-ui';

const styles = {
  cardActions: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-around',
  },
  label: {
    fontSize: '12px',
  },
};

const FilterAreaActions = ({ clearAll, selectAll }) => (
  <CardActions
    style={styles.cardActions}
  >
    <FlatButton
      label="Select All"
      labelStyle={styles.label}
      onTouchTap={selectAll}
      primary
    />
    <FlatButton
      label="Clear All"
      labelStyle={styles.label}
      onTouchTap={clearAll}
      secondary
    />
  </CardActions>
);

FilterAreaActions.propTypes = {
  clearAll: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired,
};

export default FilterAreaActions;
