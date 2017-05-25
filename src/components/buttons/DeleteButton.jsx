import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import TrashCan from 'material-ui/svg-icons/action/delete';
import ReactTooltip from 'react-tooltip';
import { branch, renderNothing } from 'recompose';

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

export const generateToolTipText = (deletingIsEnabled) => {
  if (deletingIsEnabled) {
    return (
      <span>Click to delete snippet</span>
    );
  }
  return (
    <span>You can only delete snippets<br />that you own</span>
  );
};

const hideIfNotSaved = isNotSaved => branch(isNotSaved, renderNothing);
const enhance = hideIfNotSaved(props => props.snippetKey === '' || !props.isEnabled);

export const DeleteButton = ({ onClick, isEnabled }) => (
  <span style={styles.buttonContainer}>
    <div
      style={styles.inlineBlock}
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
      getContent={() => generateToolTipText(isEnabled)}
      id="trash-tip"
      effect="solid"
      place="bottom"
    />
  </span>
);

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool.isRequired,
};

export default enhance(DeleteButton);
