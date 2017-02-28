import React, { PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

const AnnotationDisplay = ({ closeAnnotation, lineNumber, lineText, text }) => {
  return (
    <div>
      {lineNumber} - <code>{lineText}</code> <br/>
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
  lineNumber: PropTypes.string.isRequired,
  lineText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default AnnotationDisplay;
