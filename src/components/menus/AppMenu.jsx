import React, { Component, PropTypes } from 'react';
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

class AppMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconMenuOpen: false,
    };
    this.handleOnRequestChange = this.handleOnRequestChange.bind(this);
    this.handleSnippetSelected = this.handleSnippetSelected.bind(this);
  }

  handleOnRequestChange(open) {
    this.setState({
      iconMenuOpen: open,
    });
  }

  handleSnippetSelected(snippetOwner, snippetKey) {
    this.setState({
      iconMenuOpen: false,
    });
    this.props.onSnippetSelected(snippetOwner, snippetKey);
  }

  render() {
    const {
      onSignOut,
      orgSnippets,
      username,
      userSnippets,
    } = this.props;
    const {
      iconMenuOpen,
    } = this.state;

    return (
      <div>
        <IconMenu
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          iconButtonElement={makeAppMenuIcon()}
          iconStyle={styles.iconButtonElement}
          onItemTouchTap={this.handleOnItemTouchTap}
          onRequestChange={this.handleOnRequestChange}
          open={iconMenuOpen}
          style={styles.iconMenu}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          useLayerForClickAway
        >
          <SnippetList
            onClick={this.handleSnippetSelected}
            snippetOwner={username}
            primaryText="My Snippets"
            snippetsList={userSnippets}
          />
          <OrgSnippetsMenu
            onClick={this.handleSnippetSelected}
            orgSnippets={orgSnippets}
          />
          <MenuItem
            onClick={onSignOut}
            primaryText="Sign out"
          />
        </IconMenu>
      </div>
    );
  }
}

AppMenu.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  onSnippetSelected: PropTypes.func.isRequired,
  orgSnippets: CustomPropTypes.orgSnippets.isRequired,
  username: PropTypes.string.isRequired,
  userSnippets: CustomPropTypes.snippets.isRequired,
};

export default AppMenu;
