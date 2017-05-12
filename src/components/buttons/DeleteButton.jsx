import React, { PropTypes } from 'react';

import IconButton from 'material-ui/IconButton';
import TrashCan from 'material-ui/svg-icons/action/delete';
import ReactTooltip from 'react-tooltip';

const styles = {
  button: {
    zIndex: 5,
  },
  buttonContainer: {
    height: '48px',
  },
  inlineBlock: {
    display: 'inline-block',
  },
};

const DeleteButton = ({ onClick, isEnabled }) => {
  return (
    <span style={styles.buttonContainer}>
      <div
        styles={styles.inlineBlock}
        >
        <IconButton
          id="TrashButton"
          disabled={!isEnabled}
          onTouchTap={onClick}
          style={styles.button}
        >
          <TrashCan />
        </IconButton>
      </div>
    </span>
  )
};

export default DeleteButton;
