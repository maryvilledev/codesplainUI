import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

const makeListItems = (filters, onRuleSelected) => {
  const listItems = Object.keys(filters).map((filterName, index) => {
    const filter = filters[filterName]
    return (
      <ListItem
        key={filterName}
        leftCheckbox={
          <Checkbox
            checked={filter.selected}
            onCheck={() => onRuleSelected(filterName)}
          />
        }
        primaryText={filter.prettyTokenName}
      />
    )
  });
  return listItems
}

const RulesSelector = ({filters, onRuleSelected}) => {
  const listItems = makeListItems(filters, onRuleSelected)
  return (
    <List>
      <Subheader>
        Select a token type to highlight all occurences
      </Subheader>
      {listItems}
    </List>
  )
}

export default RulesSelector
