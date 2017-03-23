import React, { PropTypes } from 'react';
import { 
  IconButton, 
  IconMenu, 
  MenuItem, 
  Dialog, 
  FlatButton,
  TextField,
} from 'material-ui';
import SaveIcon from 'material-ui/svg-icons/content/save';

const saveIconButton = (
  <IconButton
    title="Save Options"
    children={<SaveIcon />}
  />
);

class SaveMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveAsName: '',
      showSaveAsDialog: false,
    }
    this.getMenu = this.getMenu.bind(this);
    this.getSaveAsDialog = this.getSaveAsDialog.bind(this);
  }

  getMenu() {
    return (
      <IconMenu
        id={this.props.id}
        iconButtonElement={saveIconButton}
      >
        <MenuItem 
          onTouchTap={this.props.onSaveClick}
          primaryText="Save" 
        />
        <MenuItem 
          onTouchTap={() => this.setState({ showSaveAsDialog: true })}
          primaryText="Save As" 
        />
      </IconMenu>
    );
  }

  getSaveAsDialog() {
    return (
      <Dialog
        actions={
          <span>
          <FlatButton
            label="Cancel"
            onTouchTap={() => this.setState({ showSaveAsDialog: false })}
          />
          <FlatButton
            primary={true}
            label="Save"
            onTouchTap={() => {
              this.props.onSaveAsClick(this.state.saveAsName);
              this.setState({ showSaveAsDialog: false });
            }}
          />
          </span>
        }
        open={this.state.showSaveAsDialog}
        onRequestClose={() => this.setState({ showSaveAsDialog: false })}
      >
        <TextField 
          hintText="Enter new title"
          onChange={(ev, newVal) => this.setState({ saveAsName: newVal })}
        />
      </Dialog>
    );
  }

  render() {
    return (
      <span>
      {this.getMenu()}
      {this.getSaveAsDialog()}
      </span>
    );
  }
}

SaveMenu.propTypes = {
  onSaveClick: PropTypes.func.isRequired,
  onSaveAsClick: PropTypes.func.isRequired,
};

export default SaveMenu
