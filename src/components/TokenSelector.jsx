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
    const tokens = this.props.tokens;
    return Object.keys(tokens).map((token, index) => {
      const tokenText = `${tokens[token].prettyTokenName} (${tokens[token].count})`;
      if (this.itemState[tokenText] === undefined) {
        this.itemState[tokenText] = false;
      }

const styles = {
  listStyle: {
    height: '30px',
    font: '14px',
    paddingLeft: '30%',
  }
}
      return (
        <ListItem
          style={styles.listStyle}
          key={`${tokenText}-index`}
          leftCheckbox={
            <Checkbox
              checked={tokens[token].selected}
              onCheck={
                (ev, checked) => this.props.onChange(token, checked)
              }
            />
          }
          primaryText={tokenText}
        />
      );
    });
  }

  render() {
    return (
      <List>
        <Subheader>Select a token type to highlight all occurences</Subheader>
        { this.makeListItems() }
      </List>
    );
  }
}

TokenSelector.propTypes = {
  tokens: PropTypes.shape({
    text: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
export default TokenSelector;
