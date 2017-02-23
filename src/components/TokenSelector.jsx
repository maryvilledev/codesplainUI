import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

class TokenSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTokens: [],
    };
  }
  render() {
    return (
      <List>
        <Subheader>Token types to highlight</Subheader>
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Functions"
        />
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Variables"
        />
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="For loop"
        />
      </List>
    );
  }

}

export default TokenSelector;
