import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';

const style = {
  subheader: {
    lineHeight: 1,
    padding: 0,
  },
  label: {
    fontSize: '8pt',
    lineHeight: 1,
    margin: 0,
  },
  innerLabel: {
    marginTop: '7px', //To match margin on checkbox
    paddingLeft: '5px',
  },
}

const makeLabelStyle = (color) => ({ backgroundColor: color });

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
        <Checkbox
          checked={selected}
          onCheck={() => onRuleSelected(filterName)}
          labelStyle={{ ...style.label, backgroundColor: color, }}
          label={<div style={style.innerLabel}>{`${prettyTokenName} (${count})`}</div>}
          key={filterName}
        />
      );
    });
};

const RulesSelector = ({ filters, onRuleSelected }) => {
  const listItems = makeListItems(filters, onRuleSelected);
  return (
    <div>
      <Subheader style={style.subheader}>
        Select a token type to highlight all occurences
      </Subheader>
      <div>
        {listItems}
      </div>
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
