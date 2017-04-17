import React, { PropTypes } from 'react';
import _ from 'lodash';

import { MenuItem } from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const makeMenuItems = _.memoize((userSnippets, onClick) => {
  if (!Object.keys(userSnippets).length) return null;
  return Object.keys(userSnippets).map(key => (
    <MenuItem
      key={key}
      primaryText={userSnippets[key].snippetTitle}
      onClick={() => onClick(key)}
    />
  ));
});

const SnippetList = ({ titles, onClick }) => {
  const menuItems = makeMenuItems(titles, onClick);
  return (
    <MenuItem
      primaryText="My Snippets"
      rightIcon={<ArrowDropRight />}
      disabled={menuItems ? false : true}
      menuItems={menuItems}
    />
  );
};

export default SnippetList;

SnippetList.proptypes = {
  titles: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}
