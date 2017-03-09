import React from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/python/python.js';
import '../styles/codesplain.css';

// Options for the CodeMirror instance that are shared by edit and annotation mddes
const baseCodeMirrorOptions = {
    lineNumbers: true,
    theme: 'codesplain',
    gutters: [ 'annotations', 'CodeMirror-linenumbers' ],
    language: 'python'
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

const Editor = ({readOnly, onChange}) => {
  const codeMirrorOptions = (readOnly ? annotationModeOptions : editModeOptions)
  return (
    <div>
      <CodeMirror
        options={codeMirrorOptions}
        onChange={onChange}
      />
    </div>
  )
}

export default Editor
