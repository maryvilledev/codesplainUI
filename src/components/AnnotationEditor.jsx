import React, { PropTypes } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import { Tab, Tabs } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import markdownRendererOptions from '../util/markdown-renderer-options';
import markdownLogo from '../../res/markdown-logo.svg';

const styles = {
  bottomContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  button: {
    flexFlow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  markdownHintText: {
    color: '#d3d3d3',
  },
  markdownIndicator: {
    paddingLeft: '1rem',
    flexFlow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  markdownLogo: {
    width: '2rem',
    height: '1rem',
  },
};

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
    this.props.saveAnnotation(annotation);
  }

  render() {
    return (
      <div>
        <Tabs>
          <Tab
            label="Write"
            onActive={() => { this.textField.focus(); }}
          >
            <TextField
              autoFocus
              fullWidth
              hintText="Enter your annotation here"
              multiLine
              name="annotationEditor"
              onChange={this.onAnnotationChange}
              ref={(textField) => { this.textField = textField; }}
              rows={4}
              value={this.state.annotation}
            />
          </Tab>
          <Tab label="Preview">
            <MarkdownRenderer
              markdown={this.state.annotation}
              options={markdownRendererOptions}
            />
          </Tab>
        </Tabs>
        <div style={styles.bottomContainer}>
          <RaisedButton
            label="Cancel"
            onTouchTap={this.clearAnnotation}
            secondary
            style={styles.button}
          />
          <RaisedButton
            disabled={!this.state.annotation}
            label="Save"
            onTouchTap={this.saveAnnotation}
            primary
            style={styles.button}
          />
          <a
            href="http://commonmark.org/help"
            rel="noopener noreferrer"
            style={styles.markdownIndicator}
            target="_blank"
          >
            <img
              alt="Markdown Logo"
              src={markdownLogo}
              style={styles.markdownLogo}
            />
            <span style={styles.markdownHintText}>
              Styling with Markdown is supported
            </span>
          </a>
        </div>
      </div>
    );
  }
}

AnnotationEditor.defaultProps = {
  annotation: '',
};

AnnotationEditor.propTypes = {
  annotation: PropTypes.string,
  closeAnnotation: PropTypes.func.isRequired,
  saveAnnotation: PropTypes.func.isRequired,
};

export default AnnotationEditor;
