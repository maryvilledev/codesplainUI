import React from 'react'
import CodeMirror from 'react-codemirror'
import { styleLine, styleAll, highlight } from '../util/codemirror-utils.js';
import { getTokenCount, getPrettyTokenName } from '../util/tokens.js';
import { parsePython3 } from '../parsers/python3';
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
    this.startParserDaemon(parsePython3)
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
  // Runs the parser every second
  startParserDaemon(parser) {
    setInterval(function() {
      const snippet = this.props.value;
      if (snippet !== undefined && snippet !== '' && snippet !== this.state.prevSnippet) {
        // Generate an AST for the current state of the code snippet, if ready
        const AST = parser(snippet);

        // Get an array mapping token types to their occurence count
        const tokenCount = [];
        getTokenCount(AST, tokenCount);

        // Generate array of strings containing pretty token name and its count
        const filters = this.props.filters;
        let newFilters = {};
        Object.keys(tokenCount).filter(t => getPrettyTokenName(t) !== undefined)
          .forEach(t => {
            let selected = false;
            if (filters[t]) selected = filters[t].selected;
            newFilters[t] = {
              prettyTokenName: getPrettyTokenName(t),
              count: tokenCount[t],
              selected: selected,
            }
          });

        //Invoke prop callback
        this.setState({prevSnippet: snippet})
        this.props.onParserRun(AST, newFilters);
      }
      if(this.props.value) {
        highlight(this.codeMirror.getCodeMirror(), this.props.AST, this.props.filters);
      }
    }.bind(this), 1000);
  }
  render() {
    const {readOnly, onChange, markedLines, openLine, value} = this.props
    const codeMirrorOptions = (readOnly ? annotationModeOptions : editModeOptions)
    if (this.codeMirror) {
      const codeMirror = this.codeMirror.getCodeMirror()
      codeMirror.clearGutter('annotations')
      markedLines.forEach((line) => codeMirror.setGutterMarker(line, 'annotations', makeMarker()))
      this.deEmphasize();
      if (openLine !== undefined)
        this.emphasizeLine(openLine);
    }
    return (
      <div>
        <CodeMirror
          options={codeMirrorOptions}
          onChange={onChange}
          ref={(cm) => this.codeMirror = cm}
          value={value}
        />
      </div>
    )
  }
}

export default Editor
