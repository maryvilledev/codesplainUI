import React, { PropTypes } from 'react';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import Lock from 'material-ui/svg-icons/action/lock';

const LockButton = ({onClick, readOnly}) => {
  const lockIcon = readOnly ? <Lock /> : <LockOpen />;
  const toolTipText = readOnly ? "Switching back to edit mode not supported yet" : "Click to switch to prevent any changes to the snippet";
  return (
    <IconButton
      disabled={readOnly}
      label={`Switch to ${ readOnly ? 'edit' : 'read-only' } mode`}
      onTouchTap={onClick}
      tooltip={toolTipText}
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
