import React, { PropTypes } from 'react';
import CodeMirror from 'react-codemirror';
import SaveButton from './SaveButton.jsx';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import ConfirmLockDialog from './ConfirmLockDialog';
import LockButton from './LockButton';

import { default as parsePython3 } from '../parsers/python3.min.js';
import { styleLine, styleAll, highlight } from '../util/codemirror-utils.js';
import { getRuleCount, rules } from '../util/rules.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/python/python.js';
import '../styles/codesplain.css';

const snippetEditorModes = {
  python3: 'python',
};

const parsers = {
  python3: parsePython3,
}

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

const styles = {
  textFieldStyle: {
    width: '400px',
    position: 'relative',
  },
  lockButtonStyle: {
    position: 'absolute',
  }
};

class SnippetArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lockDialogOpen: false,
    };

    this.switchToReadOnlyMode = this.switchToReadOnlyMode.bind(this);
    this.toggleLockDialogVisibility = this.toggleLockDialogVisibility.bind(this);
    this.onSnippetChanged = this.onSnippetChanged.bind(this);
    this.startParserDaemon = this.startParserDaemon.bind(this);
    this.triggerHighlight = this.triggerHighlight.bind(this);
    this.emphasizeLine = this.emphasizeLine.bind(this);
    this.deEmphasize = this.deEmphasize.bind(this);
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

    // Make sure a language prop was specified
    const currentLang = this.props.snippetLanguage;
    if (!currentLang) {
      console.warn('Cannot parse snippet. No language selected.');
    } else {
      // Map selected language to its parser, if one exists
      const parser = parsers[currentLang];
      if (parser === undefined) {
        console.warn(`No parser available for the ${currentLang} language`);
      } else {
        // Kick off the parsing 'daemon'
        this.startParserDaemon(parser);
      }
    }
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

  onSnippetChanged(newSnippet) {
    this.setState({ snippet: newSnippet });
    this.props.onSnippetChanged(newSnippet);
  }

  // Runs the parser every second
  startParserDaemon(parser) {
    setInterval(function() {
      const snippet = this.props.contents;
      if (snippet && snippet !== this.state.prevSnippet) {
        // Generate an AST for the current state of the code snippet, if ready
        const onError = (err) => { console.log(err) };
        const AST = parser(snippet, onError);

        // Get an array mapping rule types to their occurence count
        const ruleCount = [];
        getRuleCount(AST, ruleCount);

        // Generate array of strings containing pretty token name and its count
        const filters = this.props.filters;
        let newFilters = {};
        Object.keys(ruleCount).filter(t => rules[t] !== undefined)
          .forEach(r => {
            let selected = false;
            if (filters[r]) selected = filters[r].selected;
            newFilters[r] = { 
              prettyTokenName: rules[r].prettyName,
              count:           ruleCount[r],
              selected:        selected,
            }
          });

        // Highlight the code snippet and invoke prop callback
        highlight(this.codeMirror.getCodeMirror(), AST, newFilters);
        this.setState({ prevSnippet: snippet });
        this.props.onParserRun(AST, newFilters);
      } 
    }.bind(this), 1000);
  }

  // Can be used to trigger a highlight of the snippet via a ref
  triggerHighlight(snippet, AST, filters) {
    highlight(this.codeMirror.getCodeMirror(), AST, filters);
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
    // Inject any final options for the CodeMirror instance based on the props passed down
    const codeMirrorOptions = {
      ...(this.props.readOnly ? annotationModeOptions : editModeOptions),
      mode: snippetEditorModes[this.props.snippetLanguage],
    }; 
    // If the emphasizeLine prop was specified, then emphasize that line,
    // otherwise apply deEmphasis styling.
    const emphasizeLine = this.props.emphasizeLine;
    if (this.props.emphasizeLine !== undefined)
      this.emphasizeLine(emphasizeLine);
    else if (this.codeMirror)
      this.deEmphasize();

    return (
      <Card>
        <CardText>
        <TextField
          hintText="Snippet Name"
          value={this.props.title}
          name="snippetName"
          onChange={this.props.onTitleChanged}
          style={styles.textFieldStyle}
        />
        <LockButton
          onClick={this.toggleLockDialogVisibility}
          readOnly={this.props.readOnly}
          style={styles.lockButtonStyle}
        />
        <ConfirmLockDialog
          accept={this.switchToReadOnlyMode}
          isOpen={this.state.lockDialogOpen}
          reject={this.toggleLockDialogVisibility}
        />
        <CodeMirror
          onChange={ev => this.onSnippetChanged(ev)}
          options={codeMirrorOptions}
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
  onParserRun: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  snippetLanguage: PropTypes.string.isRequired,
  switchReadOnlyMode: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  filters: PropTypes.shape({
    prettyTokenName: PropTypes.string,
    count: PropTypes.number,
    selected: PropTypes.bool
  }),
}

export default SnippetArea;
