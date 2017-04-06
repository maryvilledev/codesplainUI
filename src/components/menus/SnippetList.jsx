import React, { PropTypes } from 'react';

import { MenuItem } from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const makeMenuItems = (titles, onClick) => {
  if (!titles.length) return null;
  return titles.map(title => (
    <MenuItem
      key={title}
      primaryText={title}
      onClick={() => onClick(title)}
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
