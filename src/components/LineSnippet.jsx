import React, { PropTypes } from 'react';
import CodeMirror from 'react-codemirror';

// Base options for CodeMirror instances for an AnnotationDisplay
const baseOptions = {
  lineNumbers: true,
  theme: 'codesplain',
  readOnly: true,
  cursorBlinkRate: -1,
};

class LineSnippet extends React.Component {
  componentDidMount() {
    const cm = this.codeMirror.getCodeMirror();
    cm.setSize('auto', 'auto');
  }
  render() {
    const codeMirrorOptions = {
      ...baseOptions,
      firstLineNumber: this.props.lineNumber,
    };
    return (
      <CodeMirror
        ref={cm => { this.codeMirror = cm; }}
        value={this.props.value}
        options={codeMirrorOptions}
      />
    );
  }
}

LineSnippet.propTypes = {
  value: PropTypes.string.isRequired,
  lineNumber: PropTypes.number.isRequired,
};

export default LineSnippet;
