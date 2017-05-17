import React, { Component, PropTypes } from 'react';

import {
  Avatar,
  IconMenu,
  MenuItem,
  IconButton,
} from 'material-ui';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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

// Return an <Avatar /> of the user's GitHub avatar if a URL is specified, else
// Return a generic menu icon
const makeAppMenuIcon = (avatarURL) => {
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
      avatarURL,
      onSignOut,
      style,
    } = this.props;
    const {
      iconMenuOpen,
    } = this.state;

    return (
      <div style={style}>
        <IconMenu
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          iconButtonElement={makeAppMenuIcon(avatarURL)}
          iconStyle={styles.iconButtonElement}
          onItemTouchTap={this.handleOnItemTouchTap}
          onRequestChange={this.handleOnRequestChange}
          open={iconMenuOpen}
          style={styles.iconMenu}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          useLayerForClickAway
        >
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
  avatarURL: PropTypes.string,
  onSignOut: PropTypes.func.isRequired,
  onSnippetSelected: PropTypes.func.isRequired,
  style: PropTypes.object,
};

AppMenu.defaultProps = {
  avatarURL: '',
  style: {},
};

export default AppMenu;
