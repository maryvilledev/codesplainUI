import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import '../styles/codesplain.css';

class TokenSelector extends React.Component {
  constructor(props) {
    super(props);
    this.itemState = {}
    this.makeListItems = this.makeListItems.bind(this);
  }

  makeListItems() {
    return this.props.tokenTypes.map((tokenType, index) => {
      const tokenText = tokenType.text
      if (this.itemState[tokenText] === undefined)
        this.itemState[tokenText] = false;
      return (
        <ListItem
          className="style-listheight"
          key={`${tokenText}-index`}
          leftCheckbox={
            <Checkbox onCheck={
                (ev, checked) => this.itemState[tokenText] = checked
              }
              className="styles-checkbox"
            />
          }
          primaryText={tokenText}
        />
      );
    });
  }

  render() {
    return (
      <List  onChange={() => this.props.onChange(this.itemState)}>
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
  onChange: PropTypes.func.isRequired,
};
export default TokenSelector;
