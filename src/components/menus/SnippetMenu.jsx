import React, { Component, PropTypes } from 'react';
import { IconMenu, MenuItem } from 'material-ui';
import SnippetList from './SnippetList';
import OrgSnippetsMenu from './OrgSnippetsMenu';
import CustomPropTypes from '../../util/custom-prop-types';

const styles = {
  iconMenu: {
    height: '100%',
    alignItems: 'center',
    display: 'inline-flex',
    paddingLeft: '10px',
    paddingRight: '10px',
    cursor: 'pointer',
  },
  menuText: {
    color: 'white',
  },
  menuClosed: {
    background: 'transparent',
    borderBottomWidth: '3px',
    borderBottomColor: 'transparent',
  },
};

const menuOpenStyle = ({ onHoverBackground, borderBottomColor }) => ({
  background: onHoverBackground,
  borderBottomWidth: '3px',
  borderBottomStyle: 'solid',
  borderBottomColor,
});

class SnippetMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      cursorOnMenuText: false,
    };
    this.handleSnippetSelected = this.handleSnippetSelected.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);

    this.menuOpenStyle = menuOpenStyle(props);
  }

  componentWillReceiveProps(nextProps) {
    this.menuOpenStyle = menuOpenStyle(nextProps);
  }

  handleMenuOpen(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    this.setState({ menuOpen: true });
  }

  handleMenuClose() {
    this.setState({ menuOpen: false });
  }

  handleSnippetSelected(snippetOwner, snippetKey) {
    this.setState({ menuOpen: false });
    this.props.onSnippetSelected(snippetOwner, snippetKey);
  }

  render() {
    const {
      style,
      username,
      userSnippets,
      orgSnippets,
      onOpenSearchMenu,
    } = this.props;
    const {
      menuOpen,
    } = this.state;

    const menuStyle = menuOpen ? this.menuOpenStyle : styles.menuClosed;
    const menuText = (
      <span style={styles.menuText}>
        Snippets
      </span>
    );

    return (
      <IconMenu
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        onTouchTap={this.handleMenuOpen}
        onRequestChange={this.handleMenuClose}
        open={menuOpen}
        style={{ ...styles.iconMenu, ...menuStyle, ...style }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        useLayerForClickAway
        iconButtonElement={menuText}
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
          onTouchTap={onOpenSearchMenu}
          primaryText="Search"
        />
      </IconMenu>
    );
  }
}

SnippetMenu.propTypes = {
  username: PropTypes.string.isRequired,
  userSnippets: CustomPropTypes.snippets.isRequired,
  orgSnippets: CustomPropTypes.orgSnippets.isRequired,
  onSnippetSelected: PropTypes.func.isRequired,
  onOpenSearchMenu: PropTypes.func.isRequired,
};

SnippetMenu.defaultProps = {
  style: {},
};

export default SnippetMenu;
