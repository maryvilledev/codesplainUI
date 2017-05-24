import React from 'react';
import { Dialog } from 'material-ui';


class SearchMenu extends React.Component {
  render() {
    const { open, onRequestClose } = this.props;
    return (
      <Dialog
        title="Blips and Chitz"
        modal={false}
        open={open}
        onRequestClose={onRequestClose}
        autoScrollBodyContent
      />
    );
  }
}

export default SearchMenu;
