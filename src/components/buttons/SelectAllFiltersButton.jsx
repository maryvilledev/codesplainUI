import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';

const SelectAllFiltersButton = ({ selectCallback }) => (
  <RaisedButton
    label="Select All Filters"
    onTouchTap={selectCallback}
    primary
  />
);

SelectAllFiltersButton.propTypes = {
  selectCallback: PropTypes.func.isRequired,
};

export default SelectAllFiltersButton;
