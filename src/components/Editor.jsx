import React, { PropTypes } from 'react';
import CodeMirror from 'react-codemirror';
import _ from 'lodash'

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/python/python.js';

import {
  highlight,
  styleLine,
  styleAll,
} from '../util/codemirror-utils.js';
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
    this.handleGutterClick = this.handleGutterClick.bind(this);
    this.emphasizeLine = this.emphasizeLine.bind(this);
    this.deEmphasize = this.deEmphasize.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return _.isEqual(nextProps, this.props)
  }

  componentDidMount() {
    const codeMirror = this.codeMirror.getCodeMirror();
    codeMirror.on('gutterClick', this.handleGutterClick);
  }

  componentDidUpdate() {
    const {
      markedLines,
      openLine,
      value,
      AST,
      filters
    } = this.props;

    const codeMirrorInst = this.codeMirror.getCodeMirror();
    codeMirrorInst.clearGutter('annotations');
    // eslint-disable-next-line array-callback-return
    markedLines.forEach((lineNumber) => {
      codeMirrorInst.setGutterMarker(Number(lineNumber), 'annotations', makeMarker());
    });
    this.deEmphasize();
    if (openLine !== undefined) {
      // Must be left as such, as line 0
      // would evaluate to false
      this.emphasizeLine(openLine);
    }
    if (value && AST.children && filters) {
      try {
        highlight(codeMirrorInst, AST, filters)
      } catch (err) {
        console.error(err)
      }
    }
  }
  handleGutterClick(instance, lineNumber) {
    const { onGutterClick, readOnly } = this.props;
    if (!readOnly) {
      return;
    }
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

  render() {
    const {
      readOnly,
      value,
      onChange
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
  openLine: PropTypes.number,
  readOnly: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default Editor;
