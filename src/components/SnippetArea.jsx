import React, { PropTypes } from 'react';
import CodeMirror from 'react-codemirror';

import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import ConfirmLockDialog from './ConfirmLockDialog';
import LockButton from './LockButton';
import SaveButton from './SaveButton';

import { getIndexToRowColConverter } from '../util/util.js';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/python/python.js';

import '../styles/codesplain.css';

const snippetEditorModes = {
  go: 'go',
  python3: 'python',
};

// Options for the CodeMirror instance that are shared by edit and annotation mddes
const baseCodeMirrorOptions = {
    lineNumbers: true,
    theme: 'codesplain',
    gutters: [ 'annotations', 'CodeMirror-linenumbers' ],
};

// Options specific for edit mode should be set here
const editModeOptions = {
  ...baseCodeMirrorOptions,
  readOnly: false,
};

// Options specific for annotation mode should be set here
const annotationModeOptions = {
  ...baseCodeMirrorOptions,
  readOnly: true,
  cursorBlinkRate: -1,
};

const makeMarker = () => {
  const marker = document.createElement("div");
  marker.style.color = "#822";
  marker.innerHTML = "●";
  return marker;
}

class SnippetArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lockDialogOpen: false
    };

    this.switchToReadOnlyMode = this.switchToReadOnlyMode.bind(this);
    this.toggleLockDialogVisibility = this.toggleLockDialogVisibility.bind(this);
  }

  componentDidMount() {
    const codeMirrorInst = this.codeMirror.getCodeMirror();
    codeMirrorInst.on('gutterClick', (codeMirror, lineNumber) => {
      // Clicking on a gutter in read-only mode should not do anything
      if (!this.props.readOnly) {
        return;
      }
      // Get information about the line clicked on
      this.props.onGutterClick(codeMirror, lineNumber);
    });
  }

  componentDidUpdate() {
    const codeMirrorInst = this.codeMirror.getCodeMirror();
    codeMirrorInst.clearGutter('annotations');
    // eslint-disable-next-line array-callback-return
    this.props.annotatedLines.map((lineNumber) => {
      codeMirrorInst.setGutterMarker(Number(lineNumber), 'annotations', makeMarker())
    });
  }

  switchToReadOnlyMode() {
    // The lock dialog should not appear any more
    this.setState({
      lockDialogOpen: false,
    });
    // Invoke the callback to switch to read-only mode
    this.props.switchReadOnlyMode();
  }

  toggleLockDialogVisibility() {
    // Get the previous state of the lock dialog's visibility
    const prevState = this.state.lockDialogOpen;
    // Set the state to the NOT of the previous state
    this.setState({
      lockDialogOpen: !prevState,
    });
  }

  render() {
    // Inject any final options for the CodeMirror instance based on the props passed down
    const codeMirrorOptions = {
      ...(this.props.readOnly ? annotationModeOptions : editModeOptions),
      mode: snippetEditorModes[this.props.snippetLanguage],
    };

    return (
      <Card>
        <CardText>
        <TextField
          hintText="Snippet Name"
          value={this.props.title}
          name="snippetName"
          onChange={this.props.onTitleChanged}
        />
        <LockButton
          onClick={this.toggleLockDialogVisibility}
          readOnly={this.props.readOnly}
        />
        <ConfirmLockDialog
          accept={this.switchToReadOnlyMode}
          isOpen={this.state.lockDialogOpen}
          reject={this.toggleLockDialogVisibility}
        />
        <CodeMirror
          onChange={ev => this.props.onSnippetChanged(ev, this.codeMirror)}
          options={ codeMirrorOptions }
          ref={cm => {this.codeMirror = cm}}
          value={this.props.contents}
        />
        <SaveButton
          onSaveClick={this.props.onSaveClick}
        />
        </CardText>
      </Card>
    );
  }
};

SnippetArea.propTypes = {
  annotatedLines: PropTypes.arrayOf(PropTypes.string).isRequired,
  contents: PropTypes.string.isRequired,
  onGutterClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onSnippetChanged: PropTypes.func.isRequired,
  onTitleChanged: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  snippetLanguage: PropTypes.string.isRequired,
  switchReadOnlyMode: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
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
