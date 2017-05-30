import React, { PropTypes } from 'react';
import { Tab, Tabs } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import MarkdownDisplayer from './MarkdownDisplayer';
import markdownLogo from '../../res/markdown-logo.svg';

const styles = {
  bottomContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '0.5rem',
  },
  button: {
    flex: '1 1',
  },
  cancelButton: {
    flex: '1 1',
  },
  hintText: {
    top: '1rem',
  },
  markdownHintText: {
    color: 'inherit',
    fontSize: 'small',
  },
  markdownIndicator: {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
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

  onAnnotationChange(_, annotation) {
    this.setState({ annotation });
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
    const { annotation } = this.state;
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
              hintStyle={styles.hintText}
              hintText="Enter your annotation here"
              multiLine
              name="annotationEditor"
              onChange={this.onAnnotationChange}
              ref={(textField) => { this.textField = textField; }}
              rows={4}
              value={annotation}
            />
          </Tab>
          <Tab label="Preview">
            <MarkdownDisplayer annotation={annotation} />
          </Tab>
        </Tabs>
        <div style={styles.bottomContainer}>
          <FlatButton
            label="Cancel"
            onTouchTap={this.clearAnnotation}
            secondary
            style={styles.cancelButton}
          />
          <FlatButton
            disabled={!annotation}
            label="Save"
            onTouchTap={this.saveAnnotation}
            primary
            style={styles.button}
          />
          <a
            className="markdown-link hoverable-link"
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
