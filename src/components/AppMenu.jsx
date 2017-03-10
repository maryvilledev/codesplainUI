import React from 'react';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { IconMenu, IconButton, MenuItem } from 'material-ui';

const AppMenu = ({ onSignOut }) => (
  <IconMenu
    iconButtonElement={
      <IconButton>
        <MoreVertIcon color="white" />
      </IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem 
      primaryText="Sign out"
      onClick={onSignOut}
    />
  </IconMenu>
);

export default AppMenu