import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import Save from 'material-ui/svg-icons/content/save';

const SaveButton = ({onSaveClick}) => {
  return (
    <IconButton
      onTouchTap={onSaveClick}
      tooltip="Save snippet" >
      <Save />
    </IconButton>
  );
}

SaveButton.propTypes = {
  onSaveClick: PropTypes.func.isRequired,
};

export default SaveButton;
