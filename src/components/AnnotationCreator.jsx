import React, { PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import LineSnippet from './LineSnippet';

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
    this.props.saveAnnotation(String(this.props.lineNumber), annotation);
  }

  render() {

    return (
      <div>
        <LineSnippet
          lineNumber={this.props.lineNumber + 1}
          value={this.props.lineText}
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
