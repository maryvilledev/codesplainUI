import React, { PropTypes } from 'react';
import _ from 'lodash';
import { MenuItem } from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import CustomPropTypes from '../../util/custom-prop-types';

const makeMenuItems = _.memoize((snippetsList, onClick) => {
  if (Object.keys(snippetsList).length === 0) {
    return null;
  }
  return Object.keys(snippetsList).map(key => (
    <MenuItem
      key={key}
      onTouchTap={() => onClick(key)}
      primaryText={snippetsList[key].snippetTitle}
    />
  ));
});

const SnippetList = ({ onClick, primaryText, snippetsList }) => {
  const menuItems = makeMenuItems(snippetsList, onClick);
  return (
    <MenuItem
      disabled={!menuItems}
      menuItems={menuItems}
      primaryText={primaryText}
      rightIcon={<ArrowDropRight />}
    />
  );
};

SnippetList.propTypes = {
  onClick: PropTypes.func.isRequired,
  primaryText: PropTypes.string.isRequired,
  snippetsList: CustomPropTypes.snippets.isRequired,
};

export default SnippetList;
