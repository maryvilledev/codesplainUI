import React from 'react';
import { Dialog, TextField, List, ListItem } from 'material-ui';

const styles = {
  list: {
    width: '100%',
    height: 400,
    overflowY: 'auto',
  },
};


class SearchMenu extends React.Component {
  constructor() {
    super();
    this.state = { filterText: '' };
    this.handleFilterTextChanged = this.handleFilterTextChanged.bind(this);
  }
  handleFilterTextChanged(_, filterText) {
    this.setState({ filterText });
  }
  render() {
    const { open, onRequestClose, orderedSnippets } = this.props;
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
          <ListItem>Dummy</ListItem><ListItem>Dummy</ListItem><ListItem>Dummy</ListItem><ListItem>Dummy</ListItem><ListItem>Dummy</ListItem><ListItem>Dummy</ListItem><ListItem>Dummy</ListItem><ListItem>Dummy</ListItem><ListItem>Dummy</ListItem><ListItem>Dummy</ListItem><ListItem>Dummy</ListItem><ListItem>Dummy</ListItem><ListItem>Dummy</ListItem>
        </List>
      </Dialog>
    );
  }
}

export default SearchMenu;
