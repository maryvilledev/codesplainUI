import React, { Component, PropTypes } from 'react';
import { Menu } from 'material-ui';
import SnippetList from './SnippetList';
import OrgSnippetsMenu from './OrgSnippetsMenu';
import CustomPropTypes from '../../util/custom-prop-types';

const styles = {
  iconMenu: {
    cursor: 'pointer',
  },
};

class SnippetMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { iconMenuOpen: false };
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
      username,
      userSnippets,
      orgSnippets,
    } = this.props;
    const {
      iconMenuOpen,
    } = this.state;

    return (
      <Menu
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        value="Snippets"
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
      </Menu>
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
