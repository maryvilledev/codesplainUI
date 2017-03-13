import React, { PropTypes } from 'react';

import AnnotationDisplay from './AnnotationDisplay';
import AnnotationEditor from './AnnotationEditor';
import LineSnippet from './LineSnippet';

class AnnotationPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: true,
    };
    this.handleSaveAnnotation = this.handleSaveAnnotation.bind(this);
    this.toggleEditState = this.toggleEditState.bind(this);
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
      snippetInformation: {
        lineNumber,
        lineText,
      },
    } = this.props;
    const { isEditing } = this.state;
    // AnnotationEditor should be rendered in two cases:
    // 1. When the annotation is empty
    // 2. When the state is explicitly set to edit mode
    const shouldRenderEditor = annotation.length === 0 || isEditing;
    return (
      <div>
        <LineSnippet
          lineNumber={lineNumber + 1}
          value={lineText}
        />
        { shouldRenderEditor ?
          <AnnotationEditor
            annotation={annotation}
            closeAnnotation={closeAnnotation}
            saveAnnotation={this.handleSaveAnnotation}
          /> :
          <AnnotationDisplay
            annotation={annotation}
            closeAnnotation={closeAnnotation}
            editAnnotation={this.toggleEditState}
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
  snippetInformation: PropTypes.shape({
    lineNumber: PropTypes.number.isRequired,
    lineText: PropTypes.string.isRequired,
  }).isRequired,
};

export default AnnotationPanel;
