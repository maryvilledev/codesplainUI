import React, { PropTypes } from 'react';

import AnnotationDisplay from './AnnotationDisplay';
import AnnotationEditor from './AnnotationEditor';
import LineSnippet from './LineSnippet';

const style = {
  container: {
    padding: '3%',
  },
};

class AnnotationPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleSaveAnnotation = this.handleSaveAnnotation.bind(this);
  }

  handleSaveAnnotation(annotation) {
    this.props.saveAnnotation(annotation);
  }

  render() {
    const {
      annotation,
      isEditing,
      onCancelEdit,
      lineAnnotated: {
        lineNumber,
        lineText,
      },
    } = this.props;

    return (
      <div style={style.container}>
        <LineSnippet
          lineNumber={lineNumber + 1}
          value={lineText}
        />
        { isEditing ?
          <AnnotationEditor
            annotation={annotation}
            onCloseEditor={onCancelEdit}
            saveAnnotation={this.handleSaveAnnotation}
          /> :
          <AnnotationDisplay
            annotation={annotation}
          />
        }
      </div>
    );
  }
}

AnnotationPanel.propTypes = {
  annotation: PropTypes.string.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  saveAnnotation: PropTypes.func.isRequired,
  lineAnnotated: PropTypes.shape({
    lineNumber: PropTypes.number,
    lineText: PropTypes.string,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default AnnotationPanel;
