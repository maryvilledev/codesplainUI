import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardText,
  CardTitle,
} from 'material-ui/Card';
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
import AnnotationActions from '../components/buttons/AnnotationActions';
import {
  getAnnotatedLines,
  getNextAnnotation,
  getPreviousAnnotation,
  hasNextAnnotation,
  hasPreviousAnnotation,
} from '../util/annotations';
import CustomPropTypes from '../util/custom-prop-types';

const styles = {
  card: {
    flex: '1 1 auto',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerTitle: {
    margin: '0',
    paddingTop: '12px',
    paddingRight: '12px',
  },
};

export class Annotations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayStatus: 'none',
      hasPreceedingAnnotation: false,
      hasProceedingAnnotation: false,
      isEditing: false,
    };
    this.getNextAnnotation = this.getNextAnnotation.bind(this);
    this.getPreviousAnnotation = this.getPreviousAnnotation.bind(this);
    this.handleCloseAnnotation = this.handleCloseAnnotation.bind(this);
    this.handleSaveAnnotation = this.handleSaveAnnotation.bind(this);
    this.toggleEditState = this.toggleEditState.bind(this);
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

  handleCloseAnnotation() {
    const { dispatch } = this.props;
    dispatch(closeAnnotationPanel());
  }

  handleSaveAnnotation(annotation) {
    const {
      dispatch,
      lineAnnotated,
      snippetKey,
    } = this.props;

    const annotationData = {
      annotation,
      ...lineAnnotated,
    };

    dispatch(saveAnnotation(annotationData));
    // Save the snippet only if this snippet has already been saved.
    if (snippetKey) {
      dispatch(saveExisting())
        .then(() => {
          this.toggleEditState();
        });
    }
  }

  toggleEditState() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    const {
      annotation,
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
        <Card style={styles.card}>
          <CardTitle
            title={<h2 className="section-title">Annotation</h2>}
          />
          <CardText>{prompt}</CardText>
        </Card>
      );
    }
    return (
      <Card style={styles.card}>
        <CardTitle
          title={
            <div style={styles.header}>
              <h2
                className="section-title"
                style={styles.headerTitle}
              >
                Annotation
              </h2>
              <AnnotationActions
                getNextAnnotation={this.getNextAnnotation}
                getPreviousAnnotation={this.getPreviousAnnotation}
                hasNextAnnotation={hasProceedingAnnotation}
                hasPrevAnnotation={hasPreceedingAnnotation}
                onClose={this.handleCloseAnnotation}
                onEdit={this.toggleEditState}
                disableEdit={this.state.isEditing}
              />
            </div>
          }
        />
        <AnnotationPanel
          annotation={annotation}
          closeAnnotation={this.handleCloseAnnotation}
          lineAnnotated={lineAnnotated}
          saveAnnotation={this.handleSaveAnnotation}
          isEditing={this.state.isEditing}
          onCancelEdit={this.toggleEditState}
        />
      </Card>
    );
  }
}

Annotations.propTypes = {
  annotation: PropTypes.string.isRequired,
  annotations: CustomPropTypes.annotations.isRequired,
  isDisplayingAnnotation: PropTypes.bool.isRequired,
  lineAnnotated: CustomPropTypes.lineAnnotated.isRequired,
  readOnly: PropTypes.bool.isRequired,
  snippetKey: PropTypes.string,
};

Annotations.defaultProps = {
  snippetKey: '',
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

export default withRouter(connect(mapStateToProps)(Annotations));
