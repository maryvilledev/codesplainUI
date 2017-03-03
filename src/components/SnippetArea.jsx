import React, { PropTypes } from 'react';
import CodeMirror from 'react-codemirror';
import SaveButton from './SaveButton.jsx';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import ConfirmLockDialog from './ConfirmLockDialog';
import LockButton from './LockButton';
import { parsePython3 } from '../parsers/python3';
import { highlight }  from '../util/highlight.js';
import { getTokenCount, getPrettyTokenName } from '../util/tokens.js';
import { getIndexToRowColConverter }  from '../util/util.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/python/python.js';
import '../styles/codesplain.css';

const snippetEditorModes = {
  go: 'go',
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
    width: '550px',
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
      lockDialogOpen: false
    };

    this.switchToReadOnlyMode = this.switchToReadOnlyMode.bind(this);
    this.toggleLockDialogVisibility = this.toggleLockDialogVisibility.bind(this);
    this.onSnippetChanged = this.onSnippetChanged.bind(this);
    this.startParserDaemon = this.startParserDaemon.bind(this);
    this.triggerHighlight = this.triggerHighlight.bind(this);
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
      const snippet = this.state.snippet;
      if (snippet === undefined) return;
      if (snippet === this.state.prevSnippet) return;
      if (snippet === '') return;

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

      // Highlight the code snippet and invoke prop callback
      highlight(snippet, AST, this.codeMirror, newFilters);
      this.setState({ prevSnippet: snippet });
      this.props.onParserRun(AST, newFilters);
    }.bind(this), 1000);
  }

  // Can be used to trigger a highlight of the snippet via a ref
  triggerHighlight(snippet, AST, filters) {
    highlight(snippet, AST, this.codeMirror, filters);
  }

  render() {
    // Inject any final options for the CodeMirror instance based on the props passed down
    const codeMirrorOptions = {
      ...(this.props.readOnly ? annotationModeOptions : editModeOptions),
      mode: snippetEditorModes[this.props.snippetLanguage],
    };

    // Make sure snippet state is same as prop
    if (this.state.snippet !== this.props.contents)
      this.setState({ snippet: this.props.contents });

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
