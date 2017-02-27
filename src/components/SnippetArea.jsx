import React, { PropTypes } from 'react';
import CodeMirror from 'react-codemirror';

import { Card, CardText } from 'material-ui/Card';
import '../styles/codesplain.css'
import TextField from 'material-ui/TextField';
import ConfirmLockDialog from './ConfirmLockDialog.jsx'
import LockButton from './LockButton';
import { getIndexToRowColConverter } from '../util/util.js';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/go/go.js';
import 'codemirror/mode/python/python.js';


const snippetEditorModes = {
  go: 'go',
  python3: 'python',
};

class SnippetArea extends React.Component {
  constructor(props) {
    super(props);
    this.codeMirrorOptions = {
      lineNumbers: true,
      theme: 'codesplain',
      mode: snippetEditorModes[this.props.snippetLanguage],
      readOnly: this.props.readOnly,
    };
  }

  render() {
    return (
      <Card>
        <CardText>
        <TextField
          name="snippetName"
          hintText="Snippet Name"
          onChange={this.props.onTitleChanged}
        />
        <LockButton
          onClick={this.props.toggleConfirmLockDialogVisibility}
          readOnly={this.props.readOnly}
        />
        <ConfirmLockDialog
          isOpen={this.props.isDialogOpen}
          accept={this.props.switchReadOnlyMode}
          reject={this.props.toggleConfirmLockDialogVisibility}
        />
        <CodeMirror
          ref={cm => this.codeMirror = cm}
          value={this.props.contents}
          options={this.codeMirrorOptions}
          onChange={ev => this.props.onSnippetChanged(ev, this.codeMirror)}
        />
        </CardText>
      </Card>
    );
  }
};

SnippetArea.propTypes = {
  contents: PropTypes.string.isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  onTitleChanged: PropTypes.func.isRequired,
  onSnippetChanged: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  snippetLanguage: PropTypes.string.isRequired,
  switchReadOnlyMode: PropTypes.func.isRequired,
  toggleConfirmLockDialogVisibility: PropTypes.func.isRequired,
}

export default SnippetArea;

/*
Given a CodeMirror ref, styleRegion() will apply the specified css style to the
given region of code. The code is treated as a single string, and characters in 
that string must be identified by their index (as opposed to row/col). Both
start and end are inclusive.
*/
export function styleRegion(codeMirrorRef, start, end, css) {
  if (end < start) throw new Error('end must be greater than start');
  const cmElement = codeMirrorRef.getCodeMirror();
  const snippet = cmElement.getValue();
  const convert = getIndexToRowColConverter(snippet);
  cmElement.markText(convert(start), convert(end), {css: css});
}
