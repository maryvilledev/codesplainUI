import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';

const labelStyle = {
  fontSize: '12px',
};

const ResetFiltersButton = ({resetCallback}) => (
  <RaisedButton
    fullWidth
    label="Reset"
    labelStyle={labelStyle}
    onTouchTap={resetCallback}
    secondary
  />
);

ResetFiltersButton.propTypes = {
  resetCallback: PropTypes.func.isRequired,
};

export default ResetFiltersButton;
