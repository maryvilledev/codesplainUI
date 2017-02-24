import React, { PropTypes } from 'react';

import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import LockOutline from 'material-ui/svg-icons/action/lock-outline';

const LockButton = ({onClick, readOnly}) => {
  const lockIcon = readOnly ? <LockOutline /> : <LockOpen />;
  return (
    <FlatButton
      label={`Switch to ${ readOnly ? 'edit' : 'read-only' } mode`}
      icon={ lockIcon }
      onClick={onClick}
      disabled={readOnly}
    />
  );
};

LockButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

export default LockButton;
