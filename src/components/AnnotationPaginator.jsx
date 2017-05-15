import React, { PropTypes } from 'react';
import { IconButton } from 'material-ui';
import Previous from 'material-ui/svg-icons/navigation/arrow-back';
import Next from 'material-ui/svg-icons/navigation/arrow-forward';

const AnnotationPaginator = ({ hasNextAnnotation, getNextAnnotation,
  hasPrevAnnotation, getPreviousAnnotation }) => (
    <div>
      <IconButton
        disabled={hasPrevAnnotation}
        id="previous-annotation"
        onTouchTap={getPreviousAnnotation}
        tooltip="Previous Annotation"
        touch
      >
        <Previous />
      </IconButton>
      <IconButton
        disabled={hasNextAnnotation}
        id="next-annotation"
        onTouchTap={getNextAnnotation}
        tooltip="Next Annotation"
        touch
      >
        <Next />
      </IconButton>
    </div>
  );

AnnotationPaginator.propTypes = {
  hasNextAnnotation: PropTypes.bool.isRequired,
  hasPrevAnnotation: PropTypes.bool.isRequired,
  getNextAnnotation: PropTypes.func.isRequired,
  getPreviousAnnotation: PropTypes.func.isRequired,
};

export default AnnotationPaginator;
