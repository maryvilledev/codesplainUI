import React, { PropTypes } from 'react';
import CodeMirror from 'react-codemirror';
import _ from 'lodash';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/python/python';

import {
  getCodeMirrorMode,
  highlight,
  styleLine,
  styleAll,
} from '../util/codemirror-utils';
import CustomPropTypes from '../util/custom-prop-types';
import '../styles/codesplain.css';

// Options for the CodeMirror instance that are shared by edit and annotation mddes
const baseCodeMirrorOptions = {
  lineNumbers: true,
  theme: 'codesplain',
  gutters: ['annotations', 'CodeMirror-linenumbers'],
  lineWrapping: true,
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

const pushValueToCodeMirror = _.once((value, codeMirrorInst) => {
  if (codeMirrorInst.getValue() && value) {
    codeMirrorInst.setValue(value);
  }
});

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleGutterClick = this.handleGutterClick.bind(this);
    this.emphasizeLine = this.emphasizeLine.bind(this);
    this.deEmphasize = this.deEmphasize.bind(this);
  }

  componentDidMount() {
    const codeMirror = this.codeMirror.getCodeMirror();
    codeMirror.on('gutterClick', this.handleGutterClick);
  }

  componentWillReceiveProps(nextProps) {
    const newAST = !_.isEqual(nextProps.AST, this.props.AST);
    const newFilters = !_.isEqual(nextProps.filters, this.props.filters);
    this.setState({ newAST, newFilters });
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps, this.props);
  }

  componentDidUpdate() {
    const {
      markedLines,
      openLine,
      AST,
      filters,
      value,
    } = this.props;
    const {
      newAST,
      newFilters,
    } = this.state;

    const codeMirrorInst = this.codeMirror.getCodeMirror();

    // If this is the first time through, value may be set without Codemirror
    // knowing about it. Push the value to codemirror to rectify
    pushValueToCodeMirror(value, codeMirrorInst);
    codeMirrorInst.clearGutter('annotations');
    // eslint-disable-next-line array-callback-return
    markedLines.forEach((lineNumber) => {
      codeMirrorInst.setGutterMarker(Number(lineNumber), 'annotations', makeMarker());
    });
    this.deEmphasize();
    if (openLine !== -1) {
      this.emphasizeLine(openLine);
    }
    if ((newAST || newFilters) && value) {
      highlight(codeMirrorInst, AST, filters);
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
      language,
      onChange,
      readOnly,
      value,
    } = this.props;

    const codeMirrorOptions = {
      mode: getCodeMirrorMode(language),
      ...(readOnly ? annotationModeOptions : editModeOptions),
    };

    return (
      <CodeMirror
        onChange={onChange}
        options={codeMirrorOptions}
        ref={(cm) => { this.codeMirror = cm; }}
        value={value}
      />
    );
  }
}

Editor.propTypes = {
  filters: CustomPropTypes.filters.isRequired,
  language: PropTypes.string.isRequired,
  markedLines: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  onGutterClick: PropTypes.func.isRequired,
  openLine: PropTypes.number,
  readOnly: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

Editor.defaultProps = {
  openLine: -1,
};

export default Editor;
