import React, { Component, PropTypes } from 'react';
import { MenuItem } from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import isEmpty from 'lodash/isEmpty';

import CustomPropTypes from '../../util/custom-prop-types';

const makeMenuItems = (gists, onClick) => {
  if (isEmpty(gists)) {
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
    return (
      <MenuItem
        disabled={!menuItems}
        focusState={focusState}
        menuItems={menuItems}
        onTouchTap={this.handleOnTouchTap}
        primaryText="Import Gist"
        rightIcon={<ArrowDropRight />}
      />
    );
  }
}

GistMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
  gists: CustomPropTypes.gists,
};

GistMenu.defaultProps = {
  gists: [],
};

export default GistMenu;
