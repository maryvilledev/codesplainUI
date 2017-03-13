import React, { PropTypes } from 'react';
import { IconButton, IconMenu, MenuItem } from 'material-ui';
import SaveIcon from 'material-ui/svg-icons/content/save';

const saveIconButton = (
  <IconButton
    tooltip="Save Options"
    children={<SaveIcon />}
  />
);

const SaveMenu = ({ onSaveClick, onSaveAsClick }) => (
  <IconMenu
    iconButtonElement={saveIconButton}
  >
    <MenuItem 
      onTouchTap={onSaveClick}
      primaryText="Save" 
    />
    <MenuItem 
      onTouchTap={onSaveAsClick}
      primaryText="Save As" 
    />
  </IconMenu>
);

SaveMenu.propTypes = {
  onSaveClick: PropTypes.func.isRequired,
  onSaveAsClick: PropTypes.func.isRequired,
};

export default SaveMenu
