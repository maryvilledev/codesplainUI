import React, { PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class AnnotationEditor extends React.Component {
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
    return (
      <div>
        <code>{this.props.lineText}</code>
        <TextField
          name="annotationEditor"
          fullWidth={true}
          hintText="Enter your annotation here"
          onChange={this.onAnnotationChange}
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

AnnotationEditor.propTypes = {
  closeAnnotation: PropTypes.func.isRequired,
  lineNumber: PropTypes.number.isRequired,
  lineText: PropTypes.string.isRequired,
  saveAnnotation: PropTypes.func.isRequired,
};

export default AnnotationEditor;
