import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { CardText } from 'material-ui/Card';
import { withRouter } from 'react-router';

import {
  closeAnnotationPanel,
} from '../actions/annotation';
import {
  saveAnnotation,
  saveExisting,
} from '../actions/app';

import AnnotationPanel from '../components/AnnotationPanel';

export class Annotations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayStatus: 'none',
    };
    this.handleCloseAnnotation = this.handleCloseAnnotation.bind(this);
    this.handleSaveAnnotation = this.handleSaveAnnotation.bind(this);
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

  render() {
    const {
      annotation,
      isDisplayingAnnotation,
      readOnly,
      lineAnnotated,
    } = this.props;

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
