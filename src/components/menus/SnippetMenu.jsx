import React, { Component, PropTypes } from 'react';
import { Menu } from 'material-ui';
import SnippetList from './SnippetList';
import OrgSnippetsMenu from './OrgSnippetsMenu';
import CustomPropTypes from '../../util/custom-prop-types';

const styles = {
  iconMenu: {
    cursor: 'pointer',
  },
  menuText: {
    cursor: 'pointer',
    color: 'white',
  },
};

class SnippetMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      snippetText: false,
      cursorOnMenuText: false,
    };
    this.handleOnRequestChange = this.handleOnRequestChange.bind(this);
    this.handleSnippetSelected = this.handleSnippetSelected.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleMenuTextHover = this.handleMenuTextHover.bind(this);
    this.handleMenuTextNotHovered = this.handleMenuTextNotHovered.bind(this);
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  handleOnRequestChange(open) {
    this.setState({
      menuOpen: open,
    });
  }

  handleSnippetSelected(snippetOwner, snippetKey) {
    this.setState({
      menuOpen: false,
    });
    this.props.onSnippetSelected(snippetOwner, snippetKey);
  }

  handleMenuTextHover() {
    this.setState({ cursorOnMenuText: true });
  }

  handleMenuTextNotHovered() {
    this.setState({ cursorOnMenuText: false });
  }

  render() {
    const {
      username,
      userSnippets,
      orgSnippets,
    } = this.props;
    const {
      menuOpen,
      cursorOnMenuText,
    } = this.state;

    const hoverStyles = cursorOnMenuText ? { textDecoration: 'underline' } : {};
    const menuText = (
      <div
        onClick={this.toggleMenu}
        style={{ ...hoverStyles, ...styles.menuText }}
        onMouseOver={this.handleMenuTextHover}
        onMouseLeave={this.handleMenuTextNotHovered}
      >
        Snippets
      </div>
    );
    const menu = menuOpen ?
      (<Menu
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        value="Snippets"
        onItemTouchTap={this.handleOnItemTouchTap}
        onRequestChange={this.handleOnRequestChange}
        open={menuOpen}
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
      </Menu>) : null;

    return (
      <span>
        {menuText}
        {menu}
      </span>
    );
  }
}

SnippetMenu.propTypes = {
  username: PropTypes.string.isRequired,
  userSnippets: CustomPropTypes.snippets.isRequired,
  orgSnippets: CustomPropTypes.orgSnippets.isRequired,
  onSnippetSelected: PropTypes.func.isRequired,
};

export default SnippetMenu;
