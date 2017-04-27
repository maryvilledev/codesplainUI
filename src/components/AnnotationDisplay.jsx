import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Previous from 'material-ui/svg-icons/navigation/arrow-back';
import Next from 'material-ui/svg-icons/navigation/arrow-forward';

import MarkdownDisplayer from './MarkdownDisplayer';

const styles = {
  actionRow: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
  },
  annotationViewButtons: {
    display: 'flex',
    flex: '0 1 auto',
    justifyContent: 'flex-end',
  },
};

const AnnotationDisplay = (props) => {
  const {
    annotation,
    closeAnnotation,
    editAnnotation,
    getNextAnnotation,
    getPreviousAnnotation,
    hasNextAnnotation,
    hasPrevAnnotation,
  } = props;

  return (
    <div>
      <MarkdownDisplayer annotation={annotation} />
      <div style={styles.actionRow}>
        <div>
          <RaisedButton
            label="Close"
            onTouchTap={closeAnnotation}
            secondary
          />
          <RaisedButton
            label="Edit"
            onTouchTap={editAnnotation}
            primary
          />
        </div>
        <div style={styles.annotationViewButtons}>
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
      </div>
    </div>
  );
};

AnnotationDisplay.propTypes = {
  annotation: PropTypes.string.isRequired,
  closeAnnotation: PropTypes.func.isRequired,
  editAnnotation: PropTypes.func.isRequired,
  getNextAnnotation: PropTypes.func.isRequired,
  getPreviousAnnotation: PropTypes.func.isRequired,
  hasNextAnnotation: PropTypes.bool.isRequired,
  hasPrevAnnotation: PropTypes.bool.isRequired,
};

export default AnnotationDisplay;
