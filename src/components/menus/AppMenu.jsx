import React, { Component, PropTypes } from 'react';

import {
  Avatar,
  IconMenu,
  MenuItem,
  IconButton,
} from 'material-ui';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import OrgSnippetsMenu from './OrgSnippetsMenu';
import SnippetList from './SnippetList';
import CustomPropTypes from '../../util/custom-prop-types';

const styles = {
  iconButtonContainer: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  iconMenu: {
    cursor: 'pointer',
  },
};

// Return an <Avatar /> of the user's GitHub avatar if a URL is specified, else
// Return a generic menu icon
const makeAppMenuIcon = (avatarUrl) => {
  if (avatarUrl) {
    return (
      <div style={styles.iconButtonContainer}>
        <Avatar
          size={30}
          src={avatarUrl}
          style={styles.avatar}
        />
        <ArrowDropDown color="white" />
      </div>
    );
  }
  return (
    <IconButton>
      <MoreVertIcon color="white" />
    </IconButton>
  );
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
      avatarUrl,
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
          iconButtonElement={makeAppMenuIcon(avatarUrl)}
          onItemTouchTap={this.handleOnItemTouchTap}
          onRequestChange={this.handleOnRequestChange}
          open={iconMenuOpen}
          style={styles.iconMenu}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          useLayerForClickAway
        >
          <SnippetList
            onClick={this.handleSnippetSelected}
            primaryText="My Snippets"
            snippetOwner={username}
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
  avatarUrl: PropTypes.string,
  onSignOut: PropTypes.func.isRequired,
  onSnippetSelected: PropTypes.func.isRequired,
  orgSnippets: CustomPropTypes.orgSnippets.isRequired,
  username: PropTypes.string.isRequired,
  userSnippets: CustomPropTypes.snippets.isRequired,
};

AppMenu.defaultProps = {
  avatarUrl: '',
};

export default AppMenu;
