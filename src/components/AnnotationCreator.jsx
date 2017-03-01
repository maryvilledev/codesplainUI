import React, { PropTypes } from 'react';
import CodeMirror from 'react-codemirror';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// Base options for CodeMirror instances for an AnnotationDisplay
const baseOptions = {
  lineNumbers: true,
  theme: 'codesplain',
  readOnly: true,
  cursorBlinkRate: 0,
};

class AnnotationCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      annotation: '',
    };
    this.clearAnnotation = this.clearAnnotation.bind(this);
    this.onAnnotationChange = this.onAnnotationChange.bind(this);
    this.saveAnnotation = this.saveAnnotation.bind(this);
  }

  onAnnotationChange(ev, annotation) {
    this.setState({
      annotation,
    });
  }

  clearAnnotation() {
    this.onAnnotationChange(null, '');
    this.props.closeAnnotation();
  }

  saveAnnotation() {
    const { annotation } = this.state;
    this.clearAnnotation();
    this.props.saveAnnotation(String(this.props.lineNumber), annotation);
  }

  render() {
    const codeMirrorOptions = {
      ...baseOptions,
      firstLineNumber: this.props.lineNumber + 1,
    }
    return (
      <div>
        <CodeMirror
          style={{
            height: 'auto',
          }}
          value={this.props.lineText}
          options={codeMirrorOptions}
        />
        <TextField
          name="annotationEditor"
          floatingLabelText="Annotation"
          fullWidth={true}
          hintText="Enter your annotation here"
          multiLine={true}
          onChange={this.onAnnotationChange}
          rows={4}
          value={this.state.annotation}
        />
        <RaisedButton
          label="Cancel"
          secondary
          onTouchTap={this.clearAnnotation}
        />
        <RaisedButton
          label="Save"
          primary
          disabled={ !Boolean(this.state.annotation) }
          onTouchTap={this.saveAnnotation}
        />
      </div>
    );
  }
}

AnnotationCreator.propTypes = {
  closeAnnotation: PropTypes.func.isRequired,
  lineNumber: PropTypes.number.isRequired,
  lineText: PropTypes.string.isRequired,
  saveAnnotation: PropTypes.func.isRequired,
};

export default AnnotationCreator;
