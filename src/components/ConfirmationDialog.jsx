import React, { PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const contentStyle = {
  width: '40%',
};

const ConfirmationDialog = ({ accept, isOpen, reject, title, message }) => {
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
      title={title}
    >
      {message}
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  accept: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
