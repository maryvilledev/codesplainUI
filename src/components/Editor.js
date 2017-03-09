import React from 'react'
import CodeMirror from 'react-codemirror'
import { styleLine, styleAll, highlight } from '../util/codemirror-utils.js';
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

const makeMarker = () => {
  const marker = document.createElement("div");
  marker.style.color = "#822";
  marker.innerHTML = "●";
  return marker;
}

class Editor extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      codeMirror: null
    }
    this.handleGutterClick = this.handleGutterClick.bind(this);
    this.emphasizeLine = this.emphasizeLine.bind(this);
    this.deEmphasize = this.deEmphasize.bind(this);
  }
  componentDidMount() {
    const codeMirror = this.codeMirror.getCodeMirror()
    codeMirror.on('gutterClick', this.handleGutterClick)
  }
  handleGutterClick(instance, line, gutter) {
    const { onGutterClick } = this.props
    const lineNumber = line
    const lineText = instance.getLine(line)
    onGutterClick(lineNumber, lineText)
  }
  // Can be used to emphasize a line of text when annotating.
  emphasizeLine(line) {
    const codeMirror = this.codeMirror.getCodeMirror()
    // Fade out the background
    const backgroundCSS = 'opacity: 0.5; font-weight: normal;';
    styleAll(codeMirror, backgroundCSS);

    // Bold the passed-in line
    const foregroundCSS = 'font-weight: bold; opacity: 1.0;';
    styleLine(codeMirror, line, foregroundCSS);
  }

  // If a line has been previously emphasized, this will de-emphasise it.
  deEmphasize() {
    const css = 'font-weight: normal; opacity: 1.0;';
    styleAll(this.codeMirror.getCodeMirror(), css);
  }
  render() {
    const {readOnly, onChange, markedLines, openLine} = this.props
    const codeMirrorOptions = (readOnly ? annotationModeOptions : editModeOptions)
    if (this.codeMirror) {
      const codeMirror = this.codeMirror.getCodeMirror()
      codeMirror.clearGutter('annotations')
      markedLines.forEach((line) => codeMirror.setGutterMarker(line, 'annotations', makeMarker()))
      if (openLine !== undefined)
        this.emphasizeLine(openLine);
      else if (this.codeMirror)
        this.deEmphasize();
    }
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
