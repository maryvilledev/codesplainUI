import React, { PropTypes } from 'react';
import {
  CardActions,
  FlatButton,
} from 'material-ui';

const styles = {
  label: {
    fontSize: '12px',
  },
};

const FilterAreaActions = ({ clearAll, selectAll }) => (
  <CardActions>
    <FlatButton
      fullWidth
      label="Select All"
      labelStyle={styles.label}
      onTouchTap={selectAll}
      primary
    />
    <FlatButton
      fullWidth
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
