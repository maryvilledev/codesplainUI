import React, { PropTypes } from 'react';
import { MenuItem } from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import SnippetList from './SnippetList';
import CustomPropTypes from '../../util/custom-prop-types';

const makeMenuItems = (orgSnippets, onClick) => {
  const orgNames = Object.keys(orgSnippets);
  if (!orgNames.length) {
    return null;
  }
  return orgNames.map(orgName => (
    <SnippetList
      onClick={onClick}
      primaryText={orgName}
      snippetsList={orgSnippets[orgName]}
      snippetOwner={orgName}
    />
  ));
};

const OrgSnippetsMenu = ({ onClick, orgSnippets }) => {
  const menuItems = makeMenuItems(orgSnippets, onClick);
  return (
    <MenuItem
      disabled={!menuItems}
      menuItems={menuItems}
      primaryText="Org snippets"
      rightIcon={<ArrowDropRight />}
    />
  );
};

OrgSnippetsMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
  orgSnippets: CustomPropTypes.orgSnippets.isRequired,
};

export default OrgSnippetsMenu;
