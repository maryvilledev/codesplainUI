import React, { PropTypes } from 'react';
import { IconButton } from 'material-ui';
import Previous from 'material-ui/svg-icons/navigation/arrow-back';
import Next from 'material-ui/svg-icons/navigation/arrow-forward';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

const styles = {
  container: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    flexGrow: '1',
  },
};

const AnnotationActions = ({
  hasNextAnnotation,
  getNextAnnotation,
  hasPrevAnnotation,
  getPreviousAnnotation,
  onClose,
  onEdit,
  disableEdit,
}) => (
  <div style={styles.container}>
    <IconButton
      tooltip="Edit"
      tooltipPosition="top-right"
      onTouchTap={onEdit}
      disabled={disableEdit}
    >
      <EditIcon />
    </IconButton>
    <div>
      <IconButton
        disabled={!hasPrevAnnotation}
        id="previous-annotation"
        onTouchTap={getPreviousAnnotation}
        tooltip="Previous Annotation"
        tooltipPosition="top-right"
        touch
      >
        <Previous />
      </IconButton>
      <IconButton
        disabled={!hasNextAnnotation}
        id="next-annotation"
        onTouchTap={getNextAnnotation}
        tooltip="Next Annotation"
        tooltipPosition="top-right"
        touch
      >
        <Next />
      </IconButton>
      <IconButton
        tooltip="Close"
        tooltipPosition="top-right"
        onTouchTap={onClose}
      >
        <CloseIcon />
      </IconButton>
    </div>
  </div>
  );

AnnotationActions.propTypes = {
  hasNextAnnotation: PropTypes.bool.isRequired,
  hasPrevAnnotation: PropTypes.bool.isRequired,
  getNextAnnotation: PropTypes.func.isRequired,
  getPreviousAnnotation: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  disableEdit: PropTypes.bool,
};

AnnotationActions.defaultProps = {
  disableEdit: false,
};

export default AnnotationActions;
