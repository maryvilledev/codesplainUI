import React, { PropTypes } from 'react';

import RuleLabel from './RuleLabel';
import CustomPropTypes from '../util/custom-prop-types';

const makeListItems = (filters, onRuleSelected) => (
  Object.keys(filters)
    .map((filterName) => {
      // Extract the filter information
      const {
        color,
        count,
        prettyTokenName,
        selected,
      } = filters[filterName];
      return (
        <RuleLabel
          key={filterName}
          rule={prettyTokenName}
          count={count}
          color={color}
          isActive={selected}
          onClick={() => onRuleSelected(filterName)}
        />
      );
    })
);

const RulesSelector = ({ filters, onRuleSelected }) => {
  const listItems = makeListItems(filters, onRuleSelected);
  return (
    <div className="rule-selector-container">
      {listItems}
    </div>
  );
};

RulesSelector.propTypes = {
  filters: CustomPropTypes.filters.isRequired,
  onRuleSelected: PropTypes.func.isRequired,
};

export default RulesSelector;
