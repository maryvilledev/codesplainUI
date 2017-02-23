import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

class TokenSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTokens: {},
    };
    this.makeListItems = this.makeListItems.bind(this);
  }

  makeListItems() {
    return this.props.tokenTypes.map((tokenType, index) => {
      return (
        <ListItem
          key={`${tokenType.text}-index`}
          leftCheckbox={<Checkbox />}
          onClick={(ev) => {console.log(ev.target.value);}}
          primaryText={tokenType.text}
        />
      );
    });
  }

  render() {
    return (
      <List>
        <Subheader>Token types to highlight</Subheader>
        { this.makeListItems() }
      </List>
    );
  }
}

TokenSelector.propTypes = {
  tokenTypes: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TokenSelector;
