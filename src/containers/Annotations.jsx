import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { CardText } from 'material-ui/Card';
import { withRouter } from 'react-router';

import {
  closeAnnotationPanel,
  openAnnotationPanel,
} from '../actions/annotation';
import {
  saveAnnotation,
  saveExisting,
} from '../actions/app';
import AnnotationPanel from '../components/AnnotationPanel';
import {
  getAnnotatedLines,
  getNextAnnotation,
  getPreviousAnnotation,
  hasNextAnnotation,
  hasPreviousAnnotation,
} from '../util/annotations';
import CustomPropTypes from '../util/custom-prop-types';

export class Annotations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayStatus: 'none',
      hasPreceedingAnnotation: false,
      hasProceedingAnnotation: false,
    };
    this.getNextAnnotation = this.getNextAnnotation.bind(this);
    this.getPreviousAnnotation = this.getPreviousAnnotation.bind(this);
    this.handleSaveAnnotation = this.handleSaveAnnotation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      annotations,
      lineAnnotated: {
        lineNumber,
      },
    } = nextProps;
    const nextAnnotatedLines = getAnnotatedLines(annotations);
    this.setState({
      hasProceedingAnnotation: hasNextAnnotation(nextAnnotatedLines, lineNumber),
      hasPreceedingAnnotation: hasPreviousAnnotation(nextAnnotatedLines, lineNumber),
    });
  }

  getPreviousAnnotation() {
    const {
      lineAnnotated: {
        lineNumber: currentLineNumber,
      },
      annotations,
      displayAnnotationPanel,
    } = this.props;

    // Get the annotated lines
    const previous = getPreviousAnnotation(annotations, currentLineNumber);
    if (!previous) {
      return;
    }
    const toDisplay = {
      lineNumber: previous.lineNumber,
      lineText: previous.lineText,
    };
    displayAnnotationPanel(toDisplay);
  }

  getNextAnnotation() {
    const {
      lineAnnotated: {
        lineNumber: currentLineNumber,
      },
      annotations,
      displayAnnotationPanel,
    } = this.props;

    // Get the annotated lines
    const next = getNextAnnotation(annotations, currentLineNumber);
    if (!next) {
      return;
    }
    const toDisplay = {
      lineNumber: next.lineNumber,
      lineText: next.lineText,
    };
    displayAnnotationPanel(toDisplay);
  }

  handleSaveAnnotation(annotation) {
    const {
      lineAnnotated,
      saveAnnotationToState,
      saveExistingSnippet,
      snippetKey,
    } = this.props;

    const annotationData = {
      annotation,
      ...lineAnnotated,
    };

    saveAnnotationToState(annotationData);
    // Save the snippet only if this snippet has already been saved.
    if (snippetKey) {
      saveExistingSnippet();
    }
  }

  render() {
    const {
      annotation,
      hideAnnotationPanel,
      isDisplayingAnnotation,
      lineAnnotated,
      readOnly,
    } = this.props;

    const {
      hasPreceedingAnnotation,
      hasProceedingAnnotation,
    } = this.state;

    if (!isDisplayingAnnotation) {
      const prompt = readOnly ?
        'Click on a line number to add an annotation or display one' :
        'Lock this snippet to add annotations';
      return (
        <CardText>{prompt}</CardText>
      );
    }
    return (
      <AnnotationPanel
        annotation={annotation}
        closeAnnotation={hideAnnotationPanel}
        getNextAnnotation={this.getNextAnnotation}
        getPreviousAnnotation={this.getPreviousAnnotation}
        hasNextAnnotation={hasProceedingAnnotation}
        hasPrevAnnotation={hasPreceedingAnnotation}
        lineAnnotated={lineAnnotated}
        saveAnnotation={this.handleSaveAnnotation}
      />
    );
  }
}

Annotations.propTypes = {
  annotation: PropTypes.string.isRequired,
  annotations: CustomPropTypes.annotations.isRequired,
  displayAnnotationPanel: PropTypes.func.isRequired,
  hideAnnotationPanel: PropTypes.func.isRequired,
  isDisplayingAnnotation: PropTypes.bool.isRequired,
  lineAnnotated: CustomPropTypes.lineAnnotated.isRequired,
  readOnly: PropTypes.bool.isRequired,
  saveAnnotationToState: PropTypes.func.isRequired,
  saveExistingSnippet: PropTypes.func.isRequired,
  snippetKey: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const {
    annotation: {
      isDisplayingAnnotation,
      lineAnnotated,
    },
    app: {
      annotations,
      readOnly,
      snippetKey,
    },
  } = state;
  const { lineNumber } = lineAnnotated;
  // Check that
  const annotation = (isDisplayingAnnotation && annotations[lineNumber] && annotations[lineNumber].annotation) || '';
  return {
    annotation,
    annotations,
    isDisplayingAnnotation,
    lineAnnotated,
    readOnly,
    snippetKey,
  };
};

export const mapDispatchToProps = dispatch => ({
  displayAnnotationPanel: (toDisplay) => {
    dispatch(openAnnotationPanel(toDisplay));
  },
  hideAnnotationPanel: () => {
    dispatch(closeAnnotationPanel());
  },
  saveAnnotationToState: (annotation) => {
    dispatch(saveAnnotation(annotation));
  },
  saveExistingSnippet: () => {
    dispatch(saveExisting());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Annotations));
