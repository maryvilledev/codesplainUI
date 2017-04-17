import React, { PropTypes } from 'react';

import AnnotationDisplay from './AnnotationDisplay';
import AnnotationEditor from './AnnotationEditor';
import LineSnippet from './LineSnippet';

const style = {
  container: {
    padding: '3%'
  }
}

class AnnotationPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: props.annotation.length === 0,
    };
    this.handleSaveAnnotation = this.handleSaveAnnotation.bind(this);
    this.toggleEditState = this.toggleEditState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      lineAnnotated: {
        lineNumber
      },
    } = this.props
    if (lineNumber !== nextProps.lineAnnotated.lineNumber) {
      this.setState({
        isEditing: nextProps.annotation.length === 0,
      });
    }
  }

  handleSaveAnnotation(annotation) {
    this.props.saveAnnotation(annotation);
    this.toggleEditState();
  }

  toggleEditState() {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  render() {
    const {
      annotation,
      closeAnnotation,
      getNextAnnotation,
      getPreviousAnnotation,
      hasNextAnnotation,
      hasPrevAnnotation,
      lineAnnotated: {
        lineNumber,
        lineText,
      },
    } = this.props;
    const { isEditing } = this.state;
    return (
      <div style={style.container}>
        <LineSnippet
          lineNumber={lineNumber + 1}
          value={lineText}
        />
      { isEditing ?
          <AnnotationEditor
            annotation={annotation}
            closeAnnotation={closeAnnotation}
            saveAnnotation={this.handleSaveAnnotation}
          /> :
          <AnnotationDisplay
            annotation={annotation}
            closeAnnotation={closeAnnotation}
            editAnnotation={this.toggleEditState}
            getNextAnnotation={getNextAnnotation}
            getPreviousAnnotation={getPreviousAnnotation}
            hasPrevAnnotation={hasPrevAnnotation}
            hasNextAnnotation={hasNextAnnotation}
          />
        }
      </div>
    );
  }
}

AnnotationPanel.propTypes = {
  annotation: PropTypes.string.isRequired,
  closeAnnotation: PropTypes.func.isRequired,
  saveAnnotation: PropTypes.func.isRequired,
  getNextAnnotation: PropTypes.func.isRequired,
  getPreviousAnnotation: PropTypes.func.isRequired,
  hasNextAnnotation: PropTypes.bool.isRequired,
  hasPrevAnnotation: PropTypes.bool.isRequired,
  lineAnnotated: PropTypes.shape({
    lineNumber: PropTypes.number,
    lineText: PropTypes.string,
  }).isRequired,
};

export default AnnotationPanel;
