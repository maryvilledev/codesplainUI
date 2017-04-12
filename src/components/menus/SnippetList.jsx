import React, { PropTypes } from 'react';

import { MenuItem } from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const makeMenuItems = (userSnippets, onClick) => {
  if (!Object.keys(userSnippets).length === 0) return null;
  return Object.keys(userSnippets).map(key => (
    <MenuItem
      key={key}
      primaryText={userSnippets[key].snippetTitle}
      onClick={() => onClick(key)}
    />
  ));
};

const SnippetList = ({ titles, onClick }) => {
  return (
    <MenuItem
      primaryText="My Snippets"
      rightIcon={<ArrowDropRight />}
      menuItems={makeMenuItems(titles, onClick)}
    />
  );
};

export default SnippetList;

SnippetList.proptypes = {
  titles: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}
