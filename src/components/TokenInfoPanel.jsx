import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';

const TokenInfoPanel = () => (
  <Card>
    <CardTitle
      title="Info Panel"
    />
    <CardText>General info about the selected token goes here</CardText>
    <Tabs>
      <Tab label="Annotation">
        <CardText>Here is some annotation info about the token.</CardText>
      </Tab>
      {/*
      TODO Integrate tokens with SyntaxDB
      <Tab label="SyntaxDB">
        <CardText>Here is some info from SyntaxDB about the token.</CardText>
      </Tab>
      */}
    </Tabs>
  </Card>
);

export default TokenInfoPanel;
