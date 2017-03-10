import React, { PropTypes } from 'react'
import CodeMirror from 'react-codemirror'
import {
  highlight,
  styleLine,
  styleAll,
} from '../util/codemirror-utils.js';
import { getTokenCount, getPrettyTokenName } from '../util/tokens.js';
import { parsePython3 } from '../parsers/python3';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/python/python.js';
import '../styles/codesplain.css';

// Options for the CodeMirror instance that are shared by edit and annotation mddes
const baseCodeMirrorOptions = {
  lineNumbers: true,
  theme: 'codesplain',
  gutters: ['annotations', 'CodeMirror-linenumbers'],
  mode: 'python',
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
  const marker = document.createElement('div');
  marker.style.color = '#822';
  marker.innerHTML = '●';
  return marker;
};

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevSnippet: undefined,
    };
    this.handleGutterClick = this.handleGutterClick.bind(this);
    this.emphasizeLine = this.emphasizeLine.bind(this);
    this.deEmphasize = this.deEmphasize.bind(this);
    this.startParserDaemon = this.startParserDaemon.bind(this);
  }

  componentDidMount() {
    const codeMirror = this.codeMirror.getCodeMirror();
    codeMirror.on('gutterClick', this.handleGutterClick);
    this.startParserDaemon(parsePython3);
  }

  componentDidUpdate() {
    const {
      markedLines,
      openLine,
    } = this.props;

    const codeMirrorInst = this.codeMirror.getCodeMirror();
    codeMirrorInst.clearGutter('annotations');
    // eslint-disable-next-line array-callback-return
    markedLines.forEach((lineNumber) => {
      codeMirrorInst.setGutterMarker(Number(lineNumber), 'annotations', makeMarker());
    });
    this.deEmphasize();
    if (openLine) {
      this.emphasizeLine(openLine);
    }
  }

  handleGutterClick(instance, lineNumber) {
    const { onGutterClick } = this.props;
    const lineText = instance.getLine(lineNumber);
    onGutterClick(lineNumber, lineText);
  }

  // Can be used to emphasize a line of text when annotating.
  emphasizeLine(line) {
    const codeMirror = this.codeMirror.getCodeMirror();
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
    setInterval(() => {
      const snippet = this.props.value;
      if (snippet && snippet !== this.state.prevSnippet) {
        // Generate an AST for the current state of the code snippet, if ready
        const AST = parser(snippet);

        // Get an array mapping token types to their occurence count
        const tokenCount = [];
        getTokenCount(AST, tokenCount);

        // Generate array of strings containing pretty token name and its count
        const filters = this.props.filters;
        const newFilters = {};
        Object.keys(tokenCount).filter(t => getPrettyTokenName(t) !== undefined)
          .forEach((t) => {
            let selected = false;
            if (filters[t]) selected = filters[t].selected;
            newFilters[t] = {
              prettyTokenName: getPrettyTokenName(t),
              count: tokenCount[t],
              selected,
            };
          });

        // Invoke prop callback
        this.setState({ prevSnippet: snippet });
        this.props.onParserRun(AST, newFilters);
      }

      if (this.props.value) {
        highlight(this.codeMirror.getCodeMirror(), this.props.AST, this.props.filters);
      }
    }, 1000);
  }

  render() {
    const {
      onChange,
      readOnly,
      value,
    } = this.props;

    const codeMirrorOptions = {
      ...(readOnly ? annotationModeOptions : editModeOptions),
    };

    return (
      <div>
        <CodeMirror
          onChange={onChange}
          options={codeMirrorOptions}
          ref={cm => this.codeMirror = cm}
          value={value}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  AST: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  markedLines: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  onGutterClick: PropTypes.func.isRequired,
  onParserRun: PropTypes.func.isRequired,
  openLine: PropTypes.number,
  readOnly: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default Editor;
