import React from 'react';
import { browserHistory } from 'react-router'
import { Card, CardText } from 'material-ui/Card';
import LanguageSelector from './LanguageSelector';
import SnippetArea from './SnippetArea';
import TokenSelector from './TokenSelector';
import TokenInfoPanel from './TokenInfoPanel';
import { parsePython3 } from '../parsers/python3';
import { highlight }  from '../util/highlight.js';
import axios from 'axios'

const languages = [
  { text: 'Go' , value: 'go' },
  { text: 'Python 3' , value: 'python3' },
];

const parsers = {
  python3: parsePython3,
}

const tokenTypes = [
  { text: "Function" },
  { text: "For loop" },
  { text: "If statement" },
  { text: "Variable" },
  { text: "Return statement" },
];

// Keeps track of how long until we're ready to parse another AST
let parseReady = true;

class AppBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      annotationDisplay: 'none',
      annotationDisplayProps: {},
      annotations: {  },
      AST: [],
      displayedAnnotation: null,
      filters: {},
      readOnly: false,
      selectedLanguage: 'python3',
      snippet: '',
      snippetEditorMode: '',
      snippetTitle: '',
    };
    this.closeAnnotation = this.closeAnnotation.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onFiltersChanged = this.onFiltersChanged.bind(this);
    this.onGutterClick = this.onGutterClick.bind(this);
    this.onSaveState = this.onSaveState.bind(this);
    this.onSnippetChanged = this.onSnippetChanged.bind(this);
    this.onSnippetTitleChanged = this.onSnippetTitleChanged.bind(this);
    this.saveAnnotation = this.saveAnnotation.bind(this);
    this.switchReadOnlyMode = this.switchReadOnlyMode.bind(this);
  }

  onGutterClick(codeMirrorInstance, lineNumber) {
    if (this.state.annotations[String(lineNumber)] === undefined) {
      this.setState({
        annotationDisplay: 'create',
        annotationDisplayProps: {
          closeAnnotation: this.closeAnnotation,
          lineNumber,
          lineText: codeMirrorInstance.getLine(lineNumber),
          saveAnnotation: this.saveAnnotation,
          snippetLanguage: this.state.selectedLanguage,
        },
      });
      return;
    }
    this.setState({
      annotationDisplay: 'display',
      annotationDisplayProps: {
        closeAnnotation: this.closeAnnotation,
        lineNumber,
        lineText: codeMirrorInstance.getLine(lineNumber),
        snippetLanguage: this.state.selectedLanguage,
        text: this.state.annotations[String(lineNumber)],
      }
    })
  }

  closeAnnotation() {
    this.setState({
      annotationDisplay: 'none',
      annotationDisplayProps: {},
    });
  }

  handleSelect(ev, index, value) {
    this.setState({
      selectedLanguage: value,
    });
  }

  switchReadOnlyMode() {
    if (this.state.readOnly) {
      console.log("Switching back to editing mode not supported yet");
      return;
    }
    this.setState({
      readOnly: !(this.state.readOnly),
    });
  }

  // Callback to be invoked when user changes snippet title
  onSnippetTitleChanged(ev) {
    const title = ev.target.value;
    this.setState({ snippetTitle: title });
  }

  onSaveState() {
    const {snippet, snippetTitle, annotations, AST, filters} = this.state;
    const obj = {snippet, snippetTitle, annotations, AST, filters};
    const stateString = JSON.stringify(obj);
    axios.post('/api/snippets/', { json: stateString })
      .then(res => {
        const id = res.data.id;
        this.setState({ id: id });
        browserHistory.push(`/${id}`);
      })
      .catch(err => {
        console.error(err);
      })
  }

  componentDidMount() {
    const { id } = this.props.params;
    if (!id) return;
    axios.get(`/api/snippets/${id}`)
      .then(res => {
        const stateString = res.data.json;
        const obj = JSON.parse(stateString);
        this.setState(obj);
      })
      .catch(err => {
        // Bad URL, redirect
        browserHistory.push('/');
      });
  }

  // Callback to be invoked when user edits the code snippet
  onSnippetChanged(snippet, codeMirrorRef) {
    this.setState({ snippet });
    // Make sure a language is selected
    const currentLang = this.state.selectedLanguage;
    if (!currentLang) {
      console.warn('Cannot parse snippet. No language selected.');
      return;
    }

    // Map to selected language to its parser, if one exists
    const parser = parsers[currentLang];
    if (parser === undefined) {
      console.warn(`No parser available for the ${currentLang} language`);
      return;
    }

    // Generate an AST for the current state of the code snippet, then
    // highlight tokens in snippet and update state
    if(parseReady) {
      parseReady = false;
      setTimeout(() => parseReady = true, 1000);
      new Promise((resolve) => resolve(parser(snippet)))
      .then((AST) => {
        highlight(snippet, AST, codeMirrorRef);
        this.setState({ AST: AST });
      });
    }
  }

  onFiltersChanged(filters) {
    this.setState({ filters });
  }

  saveAnnotation(lineNumber, annotation) {
    const annotations = this.state.annotations;
    this.setState({
      annotations: {
        ...annotations,
        [lineNumber]: annotation,
      },
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Card>
              <CardText>
                <LanguageSelector
                  languages={languages}
                  onChange={this.handleSelect}
                  selected={this.state.selectedLanguage}
                />
                <TokenSelector
                  onChange={this.onFiltersChanged}
                  tokenTypes={tokenTypes}
                />
              </CardText>
            </Card>
          </div>
          <div className="col-md-6">
            <SnippetArea
              annotatedLines={Object.keys(this.state.annotations)}
              contents={this.state.snippet}
              onGutterClick={this.onGutterClick}
              onSaveClick={this.onSaveState}
              onSnippetChanged={this.onSnippetChanged}
              onTitleChanged={this.onSnippetTitleChanged}
              readOnly={this.state.readOnly}
              snippetLanguage={this.state.selectedLanguage}
              switchReadOnlyMode={this.switchReadOnlyMode}
              title={this.state.snippetTitle}
            />
          </div>
          <div className="col-md-4">
            <TokenInfoPanel
              displayProps={this.state.annotationDisplayProps}
              displayStatus={this.state.annotationDisplay}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AppBody;
