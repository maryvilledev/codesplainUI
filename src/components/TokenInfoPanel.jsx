import React, { PropTypes } from 'react';

import { Card, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';

import AnnotationDisplay from './AnnotationDisplay';
import AnnotationCreator from './AnnotationCreator';

const AnnotationSection = ({ displayStatus, displayProps, prompt }) => {
  switch (displayStatus) {
  case 'none': {
    console.log('prompt: ' + prompt)
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
      <AnnotationCreator
        {...displayProps}
      />
    );
  }
  default: {
    return null;
  }
  }
}

const TokenInfoPanel = ({ displayStatus, displayProps, prompt, 
  saveAnnotationCallback }) => {
  return (
    <Card>
      <Tabs>
        <Tab label="Annotation">
          <AnnotationSection
            displayStatus={displayStatus}
            displayProps={displayProps}
            prompt={prompt}
          />
        </Tab>
      </Tabs>
    </Card>
  );
};

TokenInfoPanel.propTypes = {
  displayStatus: PropTypes.string.isRequired,
  displayProps: PropTypes.object.isRequired,
  prompt: PropTypes.string.isRequired,
};

export default TokenInfoPanel;
