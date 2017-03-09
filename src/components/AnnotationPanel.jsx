import React, { PropTypes } from 'react';

import { Card, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';

import AnnotationDisplay from './AnnotationDisplay';
import AnnotationEditor from './AnnotationEditor';

const AnnotationSection = ({ displayStatus, displayProps, prompt }) => {
  switch (displayStatus) {
  case 'none': {
    return (
      <CardText>{prompt}</CardText>
    );
  }
  case 'display': {
    return (
      <AnnotationDisplay
        {...displayProps}
      />
    );
  }
  case 'create': {
    return (
      <AnnotationEditor
        {...displayProps}
      />
    );
  }
  default: {
    return null;
  }
  }
}

class AnnotationPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  renderAnnotationComponent() {
    if (this.state.isEditing) {
      return (
        <AnnotationEditor

        />
      );
    }
    return (
      <AnnotationDisplay

      />
    )
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

AnnotationPanel.propTypes = {
  displayStatus: PropTypes.string.isRequired,
  displayProps: PropTypes.object.isRequired,
  prompt: PropTypes.string.isRequired,
};

export default AnnotationPanel;
