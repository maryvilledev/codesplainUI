import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

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
    paddingRight: '1rem',
  },
  cancelButton: {
    marginRight: '0.2rem',
  },
};

const AnnotationDisplay = (props) => {
  const {
    annotation,
    closeAnnotation,
    editAnnotation,
  } = props;

  return (
    <div>
      <MarkdownDisplayer annotation={annotation} />
      <div style={styles.actionRow}>
        <div style={styles.actionButtons}>
          <RaisedButton
            label="Close"
            onTouchTap={closeAnnotation}
            secondary
            style={styles.cancelButton}
          />
          <RaisedButton
            label="Edit"
            onTouchTap={editAnnotation}
            primary
          />
        </div>
      </div>
    </div>
  );
};

AnnotationDisplay.propTypes = {
  annotation: PropTypes.string.isRequired,
  closeAnnotation: PropTypes.func.isRequired,
  editAnnotation: PropTypes.func.isRequired,
};

export default AnnotationDisplay;
