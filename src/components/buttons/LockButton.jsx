import React, { PropTypes } from 'react';

import IconButton from 'material-ui/IconButton';
import Lock from 'material-ui/svg-icons/action/lock';
import LockOpen from 'material-ui/svg-icons/action/lock-open';

const style = {
  zIndex: 5,
};

const LockButton = ({ onClick, readOnly }) => {
  const lockIcon = readOnly ? <Lock /> : <LockOpen />;
  const toolTipText = readOnly ? 'Switching back to edit mode not supported yet' : 'Click to lock the snippet (this will prevent further changes.)';
  return (
    <IconButton
      disabled={readOnly}
      label={`Switch to ${readOnly ? 'edit' : 'read-only'} mode`}
      onTouchTap={onClick}
      tooltip={toolTipText}
      style={style}
    >
      {lockIcon}
    </IconButton>
  );
};

LockButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

export default LockButton;
