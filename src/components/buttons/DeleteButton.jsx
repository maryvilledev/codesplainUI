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

const toolTipText = isEnabled => (
  isEnabled ?
    (<span>
      Click to delete snippet
    </span>)
    :
    (<span>
      You can only delete snippets
      <br />
      that you own
    </span>)
);

const DeleteButton = ({ onClick, isEnabled }) => (
  <span style={styles.buttonContainer}>
    <div
      styles={styles.inlineBlock}
      data-tip
      data-for="trash-tip"
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
    <ReactTooltip
      id="trash-tip"
      effect="solid"
      place="bottom"
    >
      {toolTipText(isEnabled)}
    </ReactTooltip>
  </span>
);

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool.isRequired,
};

export default DeleteButton;
