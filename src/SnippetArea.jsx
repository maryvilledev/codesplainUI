import React from 'react';
import TextField from 'material-ui/TextField';

const SnippetArea = () => (
  <TextField
    fullWidth={true}
    floatingLabelFixed={true}
    floatingLabelText="Enter code here"
    multiLine={true}
    name="snippetArea"
    rows={30}
  />
);

export default SnippetArea;
