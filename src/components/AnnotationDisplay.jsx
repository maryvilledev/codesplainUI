import React, { PropTypes } from 'react';
import CodeMirror from 'react-codemirror';

import RaisedButton from 'material-ui/RaisedButton';

// Base options for CodeMirror instances for an AnnotationDisplay
const baseOptions = {
  lineNumbers: true,
  theme: 'codesplain',
  readOnly: true,
  cursorBlinkRate: 0,
};

const AnnotationDisplay = ({ closeAnnotation, lineNumber, lineText, snippetLanugage, text }) => {
  const codeMirrorOptions = {
    ...baseOptions,
    firstLineNumber: lineNumber + 1,
  }
  return (
    <div>
      <CodeMirror
        style={{
          height: 'auto',
        }}
        value={lineText}
        options={codeMirrorOptions}
      />
      <pre>{text}</pre>
      <RaisedButton
        label="Close"
        secondary
        onTouchTap={closeAnnotation}
      />
    </div>
  );
};

AnnotationDisplay.propTypes = {
  closeAnnotation: PropTypes.func.isRequired,
  lineNumber: PropTypes.number.isRequired,
  lineText: PropTypes.string.isRequired,
  snippetLanguage: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default AnnotationDisplay;
