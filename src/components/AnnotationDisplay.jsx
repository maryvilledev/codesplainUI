import React, { PropTypes } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import RaisedButton from 'material-ui/RaisedButton';

import markdownRendererOptions from '../util/markdown-renderer-options';

const AnnotationDisplay = (props) => {
  const {
    annotation,
    closeAnnotation,
    editAnnotation,
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
    </div>
  );
};

AnnotationDisplay.propTypes = {
  annotation: PropTypes.string.isRequired,
  closeAnnotation: PropTypes.func.isRequired,
  editAnnotation: PropTypes.func.isRequired,
};

export default AnnotationDisplay;
