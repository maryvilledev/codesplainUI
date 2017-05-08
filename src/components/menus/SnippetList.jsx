import React, { PropTypes } from 'react';
import _ from 'lodash';
import { MenuItem } from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import CustomPropTypes from '../../util/custom-prop-types';

const makeMenuItems = _.memoize((snippetsList, onClick) => {
  if (Object.keys(snippetsList).length === 0) return null;
  return Object.keys(snippetsList).map(key => (
    <MenuItem
      key={key}
      primaryText={snippetsList[key].snippetTitle}
      onTouchTap={() => onClick(key)}
    />
  ));
});

const SnippetList = ({ snippetsList, onClick }) => {
  const menuItems = makeMenuItems(snippetsList, onClick);
  return (
    <MenuItem
      disabled={!menuItems}
      menuItems={menuItems}
      primaryText="My Snippets"
      rightIcon={<ArrowDropRight />}
    />
  );
};

SnippetList.propTypes = {
  onClick: PropTypes.func.isRequired,
  snippetsList: CustomPropTypes.snippets.isRequired,
};

export default SnippetList;
