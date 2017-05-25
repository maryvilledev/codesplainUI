import React, { PropTypes } from 'react'; import SnippetList from './SnippetList';
import CustomPropTypes from '../../util/custom-prop-types';

const makeMenuItems = (orgSnippets, onClick) => {
  const orgNames = Object.keys(orgSnippets);
  if (!orgNames.length) {
    return null;
  }
  return orgNames.map(orgName => (
    <SnippetList
      key={orgName}
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
    <span>
      {menuItems}
    </span>
  );
};

OrgSnippetsMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
  orgSnippets: CustomPropTypes.orgSnippets.isRequired,
};

export default OrgSnippetsMenu;
