import React, { PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const contentStyle = {
  width: '40%',
};

const ConfirmLockDialog = ({ accept, isOpen, reject }) => {
  const actionButtons = [
    <FlatButton
      label="No"
      secondary
      onTouchTap={reject}
    />,
    <FlatButton
      label="Yes"
      primary
      onTouchTap={accept}
    />,
  ];
  return (
    <Dialog
      actions={actionButtons}
      modal
      open={isOpen}
      contentStyle={contentStyle}
      title="Are you sure you want to lock editing?"
    >
      Note that you will not be able to revert back to edit mode
    </Dialog>
  );
};

ConfirmLockDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  accept: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
};

export default ConfirmLockDialog;
