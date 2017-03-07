import React, { PropTypes } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import RaisedButton from 'material-ui/RaisedButton';

import LineSnippet from './LineSnippet';

const AnnotationDisplay = ({ annotation, closeAnnotation, editAnnotation, lineNumber, lineText, snippetLanugage }) => {
  return (
    <div>
      <LineSnippet
        lineNumber={lineNumber + 1}
        value={lineText}
      />
      <MarkdownRenderer
        markdown={annotation}
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
  lineNumber: PropTypes.number.isRequired,
  lineText: PropTypes.string.isRequired,
  snippetLanguage: PropTypes.string.isRequired,
};

export default AnnotationDisplay;
