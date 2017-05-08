import React, { PropTypes } from 'react';
import cookie from 'react-cookie';

import {
  Avatar,
  IconMenu,
  MenuItem,
} from 'material-ui';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import OrgSnippetsMenu from './OrgSnippetsMenu';
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
const AppMenu = ({ onSignOut, onSnippetSelected, orgSnippets, username, userSnippets }) => (
  <div>
    <IconMenu
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      iconButtonElement={makeAppMenuIcon()}
      iconStyle={styles.iconButtonElement}
      style={styles.iconMenu}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <SnippetList
        onClick={onSnippetSelected}
        snippetOwner={username}
        primaryText="My Snippets"
        snippetsList={userSnippets}
      />
      <OrgSnippetsMenu
        onClick={onSnippetSelected}
        orgSnippets={orgSnippets}
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
  onSnippetSelected: PropTypes.func.isRequired,
  orgSnippets: CustomPropTypes.orgSnippets.isRequired,
  username: PropTypes.string.isRequired,
  userSnippets: CustomPropTypes.snippets.isRequired,
};

export default AppMenu;
