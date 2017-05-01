import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
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
  inlineBlock: {
    display: 'inline-block',
  },
};

const saveIconButton = disabled => (
  <IconButton disabled={disabled}>
    <SaveIcon />
  </IconButton>
)

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

    // These should be strings, not spans, or the tool tip's
    // positioning will sometimes be off
    const toolTipText = enabled ? 'Save Options' : 'Login to Save';

    return (
      <span>
        <div
          style={styles.inlineBlock}
          data-tip
          data-for="save-tip"
        >
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
        </div>
        <ReactTooltip
          id="save-tip"
          effect="solid"
          place="bottom"
        >
          {toolTipText}
        </ReactTooltip>
      </span>
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
