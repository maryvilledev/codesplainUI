import React, { PropTypes } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Previous from 'material-ui/svg-icons/image/navigate-before';
import Next from 'material-ui/svg-icons/image/navigate-next';

import markdownRendererOptions from '../util/markdown-renderer-options';

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
      <MarkdownRenderer
        markdown={annotation}
        options={markdownRendererOptions}
      />
      <RaisedButton
        label="Close"
        secondary
        onTouchTap={closeAnnotation}
      />
      <RaisedButton
        label="Edit"
        primary
        onTouchTap={editAnnotation}
      />
      <IconButton
        disabled={hasPrevAnnotation}
        onTouchTap={getPreviousAnnotation}
        tooltip="View previous annotation"
      >
        <Previous />
      </IconButton>
      <IconButton
        disabled={hasNextAnnotation}
        onTouchTap={getNextAnnotation}
        tooltip="View next annotation"
      >
        <Next />
      </IconButton>
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
