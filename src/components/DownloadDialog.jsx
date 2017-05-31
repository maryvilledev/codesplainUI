import React, { Component, PropTypes } from 'react';
import {
  Dialog,
  FlatButton,
} from 'material-ui';
import CustomPropTypes from '../util/custom-prop-types';
import OrgSelector from './OrgSelector';

class DownloadDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOrg: '' };

    this.handleOrgChanged = this.handleOrgChanged.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { username } = nextProps;
    const { selectedOrg } = this.state;
    if (username && selectedOrg === '') {
      this.setState({ selectedOrg: username });
    }
  }

  handleOrgChanged(org) {
    this.setState({ selectedOrg: org });
  }

  render() {
    const {
      open,
      onDownloadClick,
      onCanceled,
      orgs,
    } = this.props;
    const {
      selectedOrg,
    } = this.state;

    const downloadDialogActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={onCanceled}
      />,
      <FlatButton
        label="Download"
        primary
        onTouchTap={() => onDownloadClick(selectedOrg)}
      />,
    ];

    return (
      <Dialog
        title="Download Zip File"
        actions={downloadDialogActions}
        modal
        open={open}
      >
        <OrgSelector
          orgs={orgs}
          value={selectedOrg}
          onChange={this.handleOrgChanged}
        />
      </Dialog>
    );
  }
}

DownloadDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onDownloadClick: PropTypes.func.isRequired,
  onCanceled: PropTypes.func.isRequired,
  orgs: CustomPropTypes.orgs.isRequired,
  username: PropTypes.string.isRequired,
};

export default DownloadDialog;
