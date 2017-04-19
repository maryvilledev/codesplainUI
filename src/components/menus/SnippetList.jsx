import React, { PropTypes } from 'react';
import _ from 'lodash';
import { MenuItem } from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import CustomPropTypes from '../../util/custom-prop-types';

const makeMenuItems = _.memoize((userSnippets, onClick) => {
  if (Object.keys(userSnippets).length === 0) return null;
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
      disabled={!menuItems}
      menuItems={menuItems}
      primaryText="My Snippets"
      rightIcon={<ArrowDropRight />}
    />
  );
};

SnippetList.propTypes = {
  titles: CustomPropTypes.snippets.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SnippetList;
