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
class Editor extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      codeMirror: null
    }
    this.handleGutterClick = this.handleGutterClick.bind(this);
  }
  componentDidMount() {
    const codeMirror = this.codeMirror.getCodeMirror()
    codeMirror.on('gutterClick', this.handleGutterClick)
  }
  handleGutterClick(instance, line, gutter) {
    const { onGutterClick } = this.props
    const lineNumber = line + 1
    const lineText = instance.getLine(line)
    onGutterClick(lineNumber, lineText)
  }
  render() {
    const {readOnly, onChange} = this.props
    const codeMirrorOptions = (readOnly ? annotationModeOptions : editModeOptions)
    return (
      <div>
        <CodeMirror
          options={codeMirrorOptions}
          onChange={onChange}
          ref={(cm) => this.codeMirror = cm}
        />
      </div>
    )
  }
}

export default Editor
