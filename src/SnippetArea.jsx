import React from 'react';
import TextField from 'material-ui/TextField';

const SnippetArea = () => (
  <TextField
    defaultValue="Enter code here"
    name="snippetArea"
    multiLine={true}
    rows={30}
  >

  </TextField>
);

export default SnippetArea;
