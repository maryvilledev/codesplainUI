import React, { PropTypes } from 'react';
import CodeMirror from 'react-codemirror';
import Save from 'material-ui/svg-icons/content/save'
import IconButton from 'material-ui/IconButton'

import TextField from 'material-ui/TextField';
import { Card, CardText } from 'material-ui/Card';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/go/go.js';
import 'codemirror/mode/python/python.js';

const snippetEditorModes = {
  go: 'go',
  python3: 'python',
};

const SnippetArea = ({ contents, onTitleChanged, onSnippetChanged, onClick, snippetLanguage }) => {
  const codeMirrorOptions = {
    lineNumbers: true,
    theme: 'material',
    mode: snippetEditorModes[snippetLanguage],
  };
  console.log(snippetLanguage
  );



  return (
    <Card>
      <CardText>
      <TextField
        name="snippetName"
        hintText="Snippet Name"
        onChange={onTitleChanged}
      />
      <CodeMirror
        value={contents}
        options={codeMirrorOptions}
        onChange={onSnippetChanged}
      />
    <IconButton
      onTouchTap={onClick}
      tooltip="Save snippet"
    >
      <Save />
    </IconButton>
      </CardText>
    </Card>
  );
};

SnippetArea.propTypes = {
  contents: PropTypes.string.isRequired,
  onTitleChanged: PropTypes.func.isRequired,
  onSnippetChanged: PropTypes.func.isRequired,
  snippetLanguage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default SnippetArea;
