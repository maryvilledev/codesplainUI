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

import OrgSelector from '../OrgSelector';
import CustomPropTypes from '../../util/custom-prop-types';

const styles = {
  container: {
    height: '48px',
  },
};

const saveIconButton = disabled => (
  <IconButton
    disabled={disabled}
    title={disabled ? 'Login to Save' : 'Save Options'}
  >
    <SaveIcon />
  </IconButton>
);

class SaveMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveAsName: '',
      showSaveAsDialog: false,
    };
    this.getMenu = this.getMenu.bind(this);
    this.getSaveAsDialog = this.getSaveAsDialog.bind(this);
  }

  getMenu() {
    const {
      canSave,
      enabled,
      onSaveClick,
    } = this.props;
    return (
      <IconMenu
        id="menu"
        iconButtonElement={saveIconButton(!enabled)}
      >
        <MenuItem
          onTouchTap={onSaveClick}
          disabled={!canSave}
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
    const {
      onOrgChanged,
      orgs,
      selectedOrg,
    } = this.props;
    return (
      <Dialog
        actions={
          <span>
            <FlatButton
              label="Cancel"
              onTouchTap={() => this.setState({ showSaveAsDialog: false })}
            />
            <FlatButton
              primary
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
          floatingLabelText="Title"
          hintText="Enter new title"
          onChange={(ev, newVal) => this.setState({ saveAsName: newVal })}
        />
        <OrgSelector
          orgs={orgs}
          value={selectedOrg}
          onChange={onOrgChanged}
        />
      </Dialog>
    );
  }

  render() {
    return (
      <span style={styles.container}>
        {this.getMenu()}
        {this.getSaveAsDialog()}
      </span>
    );
  }
}

SaveMenu.propTypes = {
  canSave: PropTypes.bool.isRequired,
  enabled: PropTypes.bool.isRequired,
  onOrgChanged: PropTypes.func.isRequired,
  onSaveAsClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  orgs: CustomPropTypes.orgs.isRequired,
  selectedOrg: PropTypes.string,
};

SaveMenu.defaultProps = {
  selectedOrg: '',
};

export default SaveMenu;
