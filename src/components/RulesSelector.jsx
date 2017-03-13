import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import {
  List,
  ListItem
} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const style = {
  subheader: {
    lineHeight: 1,
    padding: 0,
  },
  label: {
    fontSize: '10pt',
    lineHeight: 1,
    margin: 0,
  },
  innerLabel: {
    marginTop: '7px', //To match margin on checkbox
  }
}

const makeListItems = (filters, onRuleSelected) => {
  const listItems = Object.keys(filters).map((filterName) => {
    const filter = filters[filterName];
    return (
          <Checkbox
            checked={filter.selected}
            onCheck={() => onRuleSelected(filterName)}
            labelStyle={style.label}
            label={<div style={style.innerLabel}>{`${filter.prettyTokenName} (${filter.count})`}</div>}
          />
    );
  });
  return listItems;
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
  filters: PropTypes.object.isRequired,
  onRuleSelected: PropTypes.func.isRequired,
};

export default RulesSelector;
