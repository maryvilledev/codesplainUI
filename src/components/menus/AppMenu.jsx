import React, { PropTypes } from 'react';
import cookie from 'react-cookie';

import {
  Avatar,
  IconMenu,
  MenuItem,
} from 'material-ui';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import SnippetList from './SnippetList';
import CustomPropTypes from '../../util/custom-prop-types';

const styles = {
  avatar: {
    marginBottom: '1rem',
  },
  iconButtonElement: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  iconMenu: {
    cursor: 'pointer',
  },
};

// Returns an <Avatar /> of the user's GitHub icon if the requisite cookie is
// present, otherwise returns null.
const makeAppMenuIcon = () => {
  const avatarURL = cookie.load('userAvatarURL');
  if (avatarURL) {
    return (
      <div>
        <Avatar
          size={30}
          src={avatarURL}
          style={styles.avatar}
        />
        <ArrowDropDown color="white" />
      </div>
    );
  }
  return <MoreVertIcon color="white" />;
};

/*
<AppMenu /> renders as a white vertical ellipse ⋮ . When clicked it expands to
display a "Sign out" option, that when clicked invokes the 'onSignOut' prop.
*/
const AppMenu = ({ onSignOut, userSnippets, onTitleClicked }) => (
  <div>
    <IconMenu
      style={styles.iconMenu}
      iconButtonElement={makeAppMenuIcon()}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      iconStyle={styles.iconButtonElement}
    >
      <SnippetList
        onClick={onTitleClicked}
        snippetsList={userSnippets}
      />
      <MenuItem
        onClick={onSignOut}
        primaryText="Sign out"
      />
    </IconMenu>
  </div>
);

AppMenu.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  onTitleClicked: PropTypes.func.isRequired,
  userSnippets: CustomPropTypes.snippets.isRequired,
};

export default AppMenu;
