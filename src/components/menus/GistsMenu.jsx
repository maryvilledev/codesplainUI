import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { MenuItem } from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const makeMenuItems = (gists, onClick) => {
  if (_.isEmpty(gists)) {
    return null;
  }
  return gists.map(({ name, url }) => (
    <MenuItem
      key={name}
      onTouchTap={() => onClick(name, url)}
      primaryText={name}
    />
  ));
};

class GistMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusState: 'none',
    };
    this.handleOnTouchTap = this.handleOnTouchTap.bind(this);
  }
  componentWillUnmount() {
    this.setState({ focusState: 'none' });
  }

  handleOnTouchTap() {
    this.setState({
      focusState: 'focused',
    });
  }

  render() {
    const { onClick, gists } = this.props;
    const { focusState } = this.state;
    const menuItems = makeMenuItems(gists, onClick);
    return (<MenuItem
      disabled={!menuItems}
      focusState={focusState}
      menuItems={menuItems}
      onTouchTap={this.handleOnTouchTap}
      primaryText="Import Gist..."
      rightIcon={<ArrowDropRight />}
    />);
  }
}

export default GistMenu;
