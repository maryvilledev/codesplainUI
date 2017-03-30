import React, { PropTypes } from 'react';
import RuleLabel from './RuleLabel';

const makeListItems = (filters, onRuleSelected) => {
  return Object.keys(filters)
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
    });
};

const RulesSelector = ({ filters, onRuleSelected }) => {
  const listItems = makeListItems(filters, onRuleSelected);
  return (
    <div>
      {listItems}
    </div>
  );
};

RulesSelector.propTypes = {
  filters: PropTypes.shape({
    color: PropTypes.string,
    count: PropTypes.number,
    prettyTokenName: PropTypes.string,
    selected: PropTypes.bool,
  }).isRequired,
  onRuleSelected: PropTypes.func.isRequired,
};

export default RulesSelector;
