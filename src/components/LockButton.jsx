import React, { PropTypes } from 'react';

import FlatButton from 'material-ui/FlatButton';


const LockButton = ({onClick, readOnly}) => {
  return (
    <FlatButton
      label={`Switch to ${ readOnly ? 'edit' : 'read-only' } mode`}
      onClick={onClick}
    />
  );
};

LockButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

export default LockButton;
