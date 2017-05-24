import React, { Component, PropTypes } from 'react';
import { Dialog, TextField, List, ListItem } from 'material-ui';
import FuzzySearch from 'fuzzy-search';

import SnippetMenuItem from './SnippetMenuItem';
import CustomPropTypes from '../../util/custom-prop-types';

const styles = {
  list: {
    width: '100%',
    height: 400,
    overflowY: 'auto',
  },
};

const makeListItems = (snippet, onClick) => {
  const { snippetTitle, role } = snippet;
  return (
    <ListItem
      key={`${role}/${snippetTitle}`}
      onTouchTap={() => onClick(role, snippetTitle)}
      primaryText={SnippetMenuItem(snippet)}
    />
  );
};


class SearchMenu extends Component {
  constructor() {
    super();
    this.state = { filterText: '' };
    this.handleFilterTextChanged = this.handleFilterTextChanged.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { orderedSnippets } = nextProps;
    if (orderedSnippets && orderedSnippets.length > 0) {
      this.searcher = new FuzzySearch(orderedSnippets, ['snippetTitle', 'role']);
    }
  }
  handleFilterTextChanged(_, filterText) {
    this.setState({ filterText });
  }
  render() {
    const { filterText } = this.state;
    const { open, onRequestClose, orderedSnippets, onClick } = this.props;
    const listedSnippets = (this.searcher) ?
    this.searcher.search(filterText) :
    orderedSnippets;
    return (
      <Dialog
        modal={false}
        open={open}
        onRequestClose={onRequestClose}
      >
        <TextField
          hintText="Filter"
          onChange={this.handleFilterTextChanged}
          fullWidth
        />
        <List style={styles.list}>
          {listedSnippets.map(info => makeListItems(info, onClick))}
        </List>
      </Dialog>
    );
  }
}

SearchMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  orderedSnippets: CustomPropTypes.orderedSnippets,
};

export default SearchMenu;
