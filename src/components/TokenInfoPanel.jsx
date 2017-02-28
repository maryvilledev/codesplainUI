import React, { PropTypes } from 'react';
  import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';

import AnnotationDisplay from './AnnotationDisplay';
import AnnotationEditor from './AnnotationEditor';

const AnnotationSection = ({ displayStatus, displayProps }) => {
  switch (displayStatus) {
  case 'none': {
    return (
      <CardText>Click on a line to add an annotation or display one</CardText>
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

const TokenInfoPanel = ({ displayStatus, displayProps, saveAnnotationCallback }) => {
  return (
    <Card>
      <CardTitle title="Info Panel" />
      <CardText>General info about the selected token goes here</CardText>
      <Tabs>
        <Tab label="Annotation">
          <AnnotationSection
            displayStatus={displayStatus}
            displayProps={displayProps}
          />
        </Tab>
        <Tab label="SyntaxDB">
          <CardText>Here is some info from SyntaxDB about the token.</CardText>
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
