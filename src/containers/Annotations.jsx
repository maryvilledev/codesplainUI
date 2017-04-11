import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { CardText } from 'material-ui/Card';
import { withRouter } from 'react-router';

import {
  openAnnotationPanel,
  closeAnnotationPanel,
} from '../actions/annotation';
import {
  saveAnnotation,
  saveExisting,
} from '../actions/app';
import {
  getAnnotatedLines,
  getNextAnnotation,
  getPreviousAnnotation,
  hasNextAnnotation,
  hasPreviousAnnotation,
} from '../util/annotations';
import AnnotationPanel from '../components/AnnotationPanel';

export class Annotations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayStatus: 'none',
      hasPrevAnnotation: false,
      hasNextAnnotation: false,
    };
    this.handleCloseAnnotation = this.handleCloseAnnotation.bind(this);
    this.handleSaveAnnotation = this.handleSaveAnnotation.bind(this);
    this.getPreviousAnnotation = this.getPreviousAnnotation.bind(this);
    this.getNextAnnotation = this.getNextAnnotation.bind(this);
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
      hasNextAnnotation: hasNextAnnotation(nextAnnotatedLines, lineNumber),
      hasPrevAnnotation: hasPreviousAnnotation(nextAnnotatedLines, lineNumber),
    });
  }

  handleCloseAnnotation() {
    const { dispatch } = this.props;
    dispatch(closeAnnotationPanel());
  }

  handleSaveAnnotation(annotation) {
    const {
      dispatch,
      lineAnnotated
    } = this.props;

    const annotationData = {
      annotation,
      ...lineAnnotated,
    };

    dispatch(saveAnnotation(annotationData));
    dispatch(saveExisting());
  }

  getPreviousAnnotation() {
    const {
      lineAnnotated: {
        lineNumber: currentLineNumber,
      },
      annotations,
      dispatch,
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
    dispatch(openAnnotationPanel(toDisplay));
  }

  getNextAnnotation() {
    const {
      lineAnnotated: {
        lineNumber: currentLineNumber,
      },
      annotations,
      dispatch,
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
    dispatch(openAnnotationPanel(toDisplay));
  }

  render() {
    const {
      annotation,
      isDisplayingAnnotation,
      lineAnnotated,
      readOnly,
    } = this.props;

    const {
      hasNextAnnotation,
      hasPrevAnnotation,
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
        lineAnnotated={lineAnnotated}
        saveAnnotation={this.handleSaveAnnotation}
        closeAnnotation={this.handleCloseAnnotation}
        getNextAnnotation={this.getNextAnnotation}
        getPreviousAnnotation={this.getPreviousAnnotation}
        hasPrevAnnotation={hasPrevAnnotation}
        hasNextAnnotation={hasNextAnnotation}
      />
    );
  }
}

Annotations.propTypes = {
  annotation: PropTypes.string.isRequired,
  isDisplayingAnnotation: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool.isRequired,
  lineAnnotated: PropTypes.shape({
    lineNumber: PropTypes.number,
    lineText: PropTypes.string,
  }).isRequired,
  snippetLanguage: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  const {
    annotation: {
      isDisplayingAnnotation,
      lineAnnotated,
    },
    app: {
      annotations,
      readOnly,
      snippetLanguage,
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
    snippetLanguage,
  };
};

export default withRouter(connect(mapStateToProps)(Annotations));
