import React, { PropTypes } from 'react';
import MarkdownDisplayer from './MarkdownDisplayer';

const AnnotationDisplay = (props) => {
  const {
    annotation,
  } = props;

  return (
    <MarkdownDisplayer annotation={annotation} />
  );
};

AnnotationDisplay.propTypes = {
  annotation: PropTypes.string.isRequired,
};

export default AnnotationDisplay;
