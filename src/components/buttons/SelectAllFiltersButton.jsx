import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';

const labelStyle = {
  fontSize: '12px',
};

const SelectAllFiltersButton = ({ selectCallback }) => (
  <RaisedButton
    fullWidth
    label="Select All"
    labelStyle={labelStyle}
    onTouchTap={selectCallback}
    primary
  />
);

SelectAllFiltersButton.propTypes = {
  selectCallback: PropTypes.func.isRequired,
};

export default SelectAllFiltersButton;
