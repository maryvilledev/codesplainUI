import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import {
  List,
  ListItem
} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const style = {
  list: {
    height: '20px',
    fontSize: '13px',
    paddingLeft: '30%',
  },
  subheader: {
    lineHeight: '',
    paddingLeft: '',
  },
};

const makeListItems = (filters, onRuleSelected) => {
  const listItems = Object.keys(filters).map((filterName) => {
    const filter = filters[filterName];
    return (
      <ListItem
        style={style.list}
        key={filterName}
        leftCheckbox={
          <Checkbox
            checked={filter.selected}
            onCheck={() => onRuleSelected(filterName)}
          />
        }
        primaryText={`${filter.prettyTokenName} (${filter.count})`}
      />
    );
  });
  return listItems;
};

const RulesSelector = ({ filters, onRuleSelected }) => {
  const listItems = makeListItems(filters, onRuleSelected);
  return (
    <List>
      <Subheader style={style.subheader}>
        Select a token type to highlight all occurences
      </Subheader>
      {listItems}
    </List>
  );
};

RulesSelector.propTypes = {
  filters: PropTypes.object.isRequired,
  onRuleSelected: PropTypes.func.isRequired,
};

export default RulesSelector;
