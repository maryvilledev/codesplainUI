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
  const { key, role } = snippet;
  return (
    <ListItem
      key={`${role}/${key}`}
      onTouchTap={() => onClick(role, key)}
      primaryText={SnippetMenuItem(snippet)}
    />
  );
};


class SearchMenu extends Component {
  constructor() {
    super();
    this.state = { filterText: '' };
    this.handleFilterTextChanged = this.handleFilterTextChanged.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleMakeSelection = this.handleMakeSelection.bind(this);
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
  handleRequestClose() {
    const { onRequestClose } = this.props;
    this.setState({ filterText: '' });
    onRequestClose();
  }
  handleMakeSelection(...args) {
    const { onClick } = this.props;
    this.setState({ filterText: '' });
    onClick(...args);
  }
  render() {
    const { filterText } = this.state;
    const { open, orderedSnippets } = this.props;
    const listedSnippets = (filterText) ?
    this.searcher.search(filterText) :
    orderedSnippets;
    return (
      <Dialog
        title={<h1>Snippet Search</h1>}
        modal={false}
        open={open}
        onRequestClose={this.handleRequestClose}
      >
        <TextField
          hintText="Filter"
          onChange={this.handleFilterTextChanged}
          fullWidth
        />
        <List style={styles.list}>
          {listedSnippets.map(info =>
            makeListItems(info, this.handleMakeSelection))}
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
