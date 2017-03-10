import React, { PropTypes } from 'react';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { IconMenu, IconButton, MenuItem } from 'material-ui';

/*
<AppMenu /> renders as a white vertical ellipse ⋮ . When clicked it expands to
display a "Sign out" option, that when clicked invoked the 'onSignOut' prop.
*/
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

AppMenu.proptypes = {
  onSignOut: PropTypes.func.isRequired,
}

export default AppMenu