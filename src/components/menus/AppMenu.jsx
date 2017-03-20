import React, { PropTypes } from 'react';
import cookie from 'react-cookie';

import {
  Avatar,
  IconButton,
  IconMenu,
  MenuItem,
} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const styles = {
  avatar: {
    marginBottom: '13px',
    marginRight: '8px',
  }
}

// Returns an <Avatar /> of the user's GitHub icon if the requisite cookie is
// present, otherwise returns null.
const getUserAvatar = () => {
  const avatarURL = cookie.load('userAvatarURL');
  return avatarURL ?
      <Avatar
        src={avatarURL}
        size={30}
        style={styles.avatar}
      /> : null;
}

/*
<AppMenu /> renders as a white vertical ellipse ⋮ . When clicked it expands to
display a "Sign out" option, that when clicked invoked the 'onSignOut' prop.
*/
const AppMenu = ({ onSignOut }) => (
  <div>
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
    {getUserAvatar()}
  </div>
);

AppMenu.proptypes = {
  onSignOut: PropTypes.func.isRequired,
};

export default AppMenu;
