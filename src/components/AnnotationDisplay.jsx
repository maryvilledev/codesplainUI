import React, { PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import LineSnippet from './LineSnippet';

const style = {
  fontFamily: 'monospace'
}

const AnnotationDisplay = ({ closeAnnotation, lineNumber, lineText, snippetLanugage, text }) => {
  return (
    <div>
      <LineSnippet
        lineNumber={lineNumber + 1}
        value={lineText}
      />
      <p style={style}>{text}</p>
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
