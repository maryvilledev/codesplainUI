import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { CardText } from 'material-ui/Card';

import {
  closeAnnotationPanel,
} from '../actions/annotation';

import {
  saveAnnotation,
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
    const { dispatch, id, snippetInformation } = this.props;
    const annotationData = {
      annotation,
      ...snippetInformation,
    };
    dispatch(saveAnnotation(annotationData, id));
  }

  render() {
    const {
      annotation,
      isDisplayingAnnotation,
      readOnly,
      snippetInformation,
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
        snippetInformation={snippetInformation}
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
  snippetInformation: PropTypes.shape({
    lineNumber: PropTypes.number,
    lineText: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const {
    isDisplayingAnnotation,
    snippetInformation: {
      lineNumber,
    },
  } = state.annotation;
  // Check that
  const annotation = isDisplayingAnnotation ? (state.app.annotations[lineNumber] && state.app.annotations[lineNumber].annotation) || '' : '';
  return {
    isDisplayingAnnotation,
    readOnly: state.app.readOnly,
    snippetLanguage: state.app.snippetLanguage,
    snippetInformation: state.annotation.snippetInformation,
    annotation,
    appState: state.app,
  };
};

export default connect(mapStateToProps)(Annotations);
