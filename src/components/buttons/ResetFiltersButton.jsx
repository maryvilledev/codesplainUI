import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';

const ResetFiltersButton = ({resetCallback}) => (
  <RaisedButton
    label="Reset Filters"
    onTouchTap={resetCallback}
    secondary
  />
);

ResetFiltersButton.propTypes = {
  resetCallback: PropTypes.func.isRequired,
};

export default ResetFiltersButton;
