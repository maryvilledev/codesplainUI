import React, { Component, PropTypes } from 'react';
import { MenuItem } from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import CustomPropTypes from '../../util/custom-prop-types';

const makeMenuItems = (snippetOwner, snippetsList, onClick) => {
  if (Object.keys(snippetsList).length === 0) {
    return null;
  }
  return Object.keys(snippetsList).map(snippetKey => (
    <MenuItem
      key={snippetKey}
      onTouchTap={() => onClick(snippetOwner, snippetKey)}
      primaryText={snippetsList[snippetKey].snippetTitle}
    />
  ));
};

class SnippetList extends Component {
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
    const {
      onClick,
      primaryText,
      snippetOwner,
      snippetsList,
    } = this.props;
    const {
      focusState,
    } = this.state;
    const menuItems = makeMenuItems(snippetOwner, snippetsList, onClick);
    return (
      <MenuItem
        disabled={!menuItems}
        focusState={focusState}
        menuItems={menuItems}
        onTouchTap={this.handleOnTouchTap}
        primaryText={primaryText}
        rightIcon={<ArrowDropRight />}
      />
    );
  }
}

SnippetList.propTypes = {
  onClick: PropTypes.func.isRequired,
  primaryText: PropTypes.string.isRequired,
  snippetsList: CustomPropTypes.snippets.isRequired,
  snippetOwner: PropTypes.string.isRequired,
};

export default SnippetList;
