import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { Card, CardText } from 'material-ui/Card';

const SnippetArea = ({ onTitleChanged, onSnippetChanged }) => (
  <Card>
    <CardText>
    <TextField
      name="snippetName"
      hintText="Snippet Name"
      onChange={onTitleChanged}
    />
    <TextField
      fullWidth={true}
      floatingLabelFixed={true}
      floatingLabelText="Enter code here"
      multiLine={true}
      name="snippetArea"
      rows={30}
      textareaStyle={{
        'fontFamily': 'monospace',
      }}
      onChange={onSnippetChanged}
    />
    </CardText>
  </Card>
);

SnippetArea.propTypes = {
  onTitleChanged: PropTypes.func.isRequired,
  onSnippetChanged: PropTypes.func.isRequired,
}

export default SnippetArea;
