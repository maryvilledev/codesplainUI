import React, { PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

const AnnotationDisplay = ({ closeAnnotation, lineText, text }) => {
  return (
    <div>
      <code>{lineText}</code> <br/>
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
  lineText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default AnnotationDisplay;
