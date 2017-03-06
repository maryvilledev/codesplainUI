import React, { PropTypes } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import RaisedButton from 'material-ui/RaisedButton';
import { Tab, Tabs } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';

import LineSnippet from './LineSnippet';

class AnnotationEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      annotation: this.props.annotation,
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
    this.props.saveAnnotation(this.props.lineNumber, this.props.lineText, annotation);
  }

  render() {

    return (
      <div>
        <LineSnippet
          lineNumber={this.props.lineNumber + 1}
          value={this.props.lineText}
        />
      <Tabs>
        <Tab
          onActive={() => { this.textField.focus() }}
          label="Write"
        >
          <TextField
            autoFocus
            name="annotationEditor"
            floatingLabelText="Annotation"
            fullWidth={true}
            hintText="Enter your annotation here"
            multiLine={true}
            onChange={this.onAnnotationChange}
            ref={textField => this.textField = textField}
            rows={4}
            value={this.state.annotation}
          />
        </Tab>
        <Tab label="Preview">
          <MarkdownRenderer
            markdown={this.state.annotation}
          />
        </Tab>
      </Tabs>

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

AnnotationEditor.defaultProps = {
  annotation: '',
}

AnnotationEditor.propTypes = {
  annotation: PropTypes.string,
  closeAnnotation: PropTypes.func.isRequired,
  lineNumber: PropTypes.number.isRequired,
  lineText: PropTypes.string.isRequired,
  saveAnnotation: PropTypes.func.isRequired,
};

export default AnnotationEditor;
