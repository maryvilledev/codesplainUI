import React, { Component, PropTypes } from 'react';
import { IconMenu } from 'material-ui';
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
  },
  menuText: {
    color: 'white',
  },
};

class SnippetMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      cursorOnMenuText: false,
    };
    this.handleSnippetSelected = this.handleSnippetSelected.bind(this);
    this.handleMenuHovered = this.handleMenuHovered.bind(this);
    this.handleMenuNotHovered = this.handleMenuNotHovered.bind(this);
  }

  handleMenuHovered(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    this.setState({ menuOpen: true });
  }

  handleMenuNotHovered() {
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
      onHoverBackground,
      borderBottomColor,
    } = this.props;
    const {
      menuOpen,
    } = this.state;

    const menuOpenStyle = menuOpen ? {
      background: onHoverBackground,
      borderBottomWidth: '3px',
      borderBottomStyle: 'solid',
      borderBottomColor,
    } : {
      background: 'transparent',
      borderBottomWidth: '3px',
      borderBottomColor: 'transparent',
    };
    const menuText = (
      <span style={styles.menuText}>
        Snippets
      </span>
    );

    return (
      <IconMenu
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        onMouseEnter={this.handleMenuHovered}
        onRequestChange={this.handleMenuNotHovered}
        open={menuOpen}
        style={{ ...styles.iconMenu, ...menuOpenStyle, ...style }}
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
      </IconMenu>
    );
  }
}

SnippetMenu.propTypes = {
  username: PropTypes.string.isRequired,
  userSnippets: CustomPropTypes.snippets.isRequired,
  orgSnippets: CustomPropTypes.orgSnippets.isRequired,
  onSnippetSelected: PropTypes.func.isRequired,
  onHoverBackground: PropTypes.string.isRequired,
  borderBottomColor: PropTypes.string.isRequired,
};

SnippetMenu.defaultProps = {
  style: {},
};

export default SnippetMenu;
