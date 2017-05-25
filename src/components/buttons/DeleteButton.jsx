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

const hideIfNotSaved = isNotSaved => branch(isNotSaved, renderNothing);
const enhance = hideIfNotSaved(props => props.snippetKey === '' || !props.isEnabled);

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

export default enhance(DeleteButton);
