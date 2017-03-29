import React, { PropTypes } from 'react';

import IconButton from 'material-ui/IconButton';
import Lock from 'material-ui/svg-icons/action/lock';
import LockOpen from 'material-ui/svg-icons/action/lock-open';

const styles = {
  button: {
    zIndex: 5,
  },
  buttonContainer: {
    height: '48px',
  },
};

const LockButton = ({ id, onClick, readOnly }) => {
  const lockIcon = readOnly ? <Lock /> : <LockOpen />;
  const toolTipText = readOnly ? 'Switching back to edit mode not supported yet' : 'Click to lock the snippet (this will prevent further changes.)';
  return (
    <span style={styles.buttonContainer} title={toolTipText}>
      <IconButton
        id={id}
        disabled={readOnly}
        label={`Switch to ${readOnly ? 'edit' : 'read-only'} mode`}
        onTouchTap={onClick}
        style={styles.button}
      >
        {lockIcon}
      </IconButton>
    </span>
  );
};

LockButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

export default LockButton;
