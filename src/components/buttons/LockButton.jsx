import React, { PropTypes } from 'react';

import IconButton from 'material-ui/IconButton';
import Lock from 'material-ui/svg-icons/action/lock';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
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

const LockButton = ({ onClick, readOnly }) => {
  const lockIcon = readOnly ? <Lock /> : <LockOpen />;

  // These should be left as spans with breaks, or the tool
  // tip's positioning will sometimes be off
  const toolTipText = readOnly ?
    (<span>
      Switching back to edit mode
      <br />
      not supported yet
    </span>)
    :
    (<span>
      Click to lock the snippet
      <br />
      (this will prevent further changes.)
    </span>);

  return (
    <span style={styles.buttonContainer}>
      <div
        style={styles.inlineBlock}
        data-tip
        data-for="lock-tip"
      >
        <IconButton
          id="lockButton"
          disabled={readOnly}
          label={`Switch to ${readOnly ? 'edit' : 'read-only'} mode`}
          onTouchTap={onClick}
          style={styles.button}
        >
          {lockIcon}
        </IconButton>
      </div>
      <ReactTooltip
        id="lock-tip"
        effect="solid"
        place="bottom"
      >
        {toolTipText}
      </ReactTooltip>
    </span>
  );
};

LockButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

export default LockButton;
