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

export const DeleteButton = ({ onClick }) => (
  <span style={styles.buttonContainer}>
    <div
      style={styles.inlineBlock}
      data-tip
      data-for="trash-tip"
    >
      <IconButton
        id="TrashButton"
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
      <span>Click to delete snippet</span>
    </ReactTooltip>
  </span>
);

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  // eslint-disable-next-line
  isEnabled: PropTypes.bool.isRequired,
  // eslint-disable-next-line
  snippetKey: PropTypes.string,
};

DeleteButton.defaultProps = {
  snippetKey: '',
};

// Render <Nothing /> (which renders null) if the user cannot delete the
// current snippet (either because it hasn't been saved, or they don't own)
// the snippet
const hideIfCannotDelete = isNotSaved => branch(isNotSaved, renderNothing);
const enhance = hideIfCannotDelete(props => props.snippetKey === '' || !props.isEnabled);

export default enhance(DeleteButton);
