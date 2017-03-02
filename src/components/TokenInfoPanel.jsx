import React, { PropTypes } from 'react';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';

import AnnotationDisplay from './AnnotationDisplay';
import AnnotationCreator from './AnnotationCreator';

const AnnotationSection = ({ displayStatus, displayProps }) => {
  switch (displayStatus) {
  case 'none': {
    return (
      <CardText>Click on a line number to add an annotation or display one</CardText>
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

const TokenInfoPanel = ({ displayStatus, displayProps, saveAnnotationCallback }) => {
  return (
    <Card>
      <Tabs>
        <Tab label="Annotation">
          <AnnotationSection
            displayStatus={displayStatus}
            displayProps={displayProps}
          />
        </Tab>
      </Tabs>
    </Card>
  );
};

TokenInfoPanel.propTypes = {
  displayStatus: PropTypes.string.isRequired,
  displayProps: PropTypes.object.isRequired,
};

export default TokenInfoPanel;
