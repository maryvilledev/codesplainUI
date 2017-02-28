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
      isDialogOpen: false,
      readOnly: false,
      selectedLanguage: 'python3',
      snippetEditorMode: '',
      snippet: '',
      snippetTitle: '',
      annotations: [],
      AST: [],
      filters: {},
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.onSnippetChanged = this.onSnippetChanged.bind(this);
    this.onSnippetTitleChanged = this.onSnippetTitleChanged.bind(this);
    this.onFiltersChanged = this.onFiltersChanged.bind(this);
    this.onSaveState = this.onSaveState.bind(this);
    this.switchReadOnlyMode = this.switchReadOnlyMode.bind(this);
    this.toggleConfirmLockDialogVisibility = this.toggleConfirmLockDialogVisibility.bind(this);
  }

  handleSelect(ev, index, value) {
    this.setState({
      selectedLanguage: value,
    });
  }

  toggleConfirmLockDialogVisibility() {
    this.setState({
      isDialogOpen: !(this.state.isDialogOpen),
    })
  }

  switchReadOnlyMode() {
    if (this.state.readOnly) {
      console.log("Switching back to editing mode not supported yet");
      return;
    }
    this.setState({
      isDialogOpen: false,
      readOnly: !(this.state.readOnly),
    });
  }

  // Callback to be invoked when user changes snippet title
  onSnippetTitleChanged(ev) {
    const title = ev.target.value;
    this.setState({ snippetTitle: title });
  }

  onSaveState() {
    const {snippet, snippetTitle, annotations, AST, filters} = this.state
    const obj = {snippet, snippetTitle, annotations, AST, filters}
    const stateString = JSON.stringify(obj)
    axios.post('/api/snippets/',{ json: stateString })
      .then(res => {
        const id = res.data.id
        this.setState({ id: id })
      })
      .catch(err => {
        console.error(err)
      })
  }

  componentDidMount() {
    const { id } = this.props.params;
    if (!id) {
      return
    }

    axios.get(`/api/snippets/${id}`)
      .then(res => {
        const stateString = res.data.json;
        const obj = JSON.parse(stateString)
        this.setState(obj)
      })
      .catch(err => {
        //Bad URL, redirect
        browserHistory.push("/")
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
        console.log(JSON.stringify(AST));
        highlight(snippet, AST, codeMirrorRef);
        this.setState({ AST: AST });
      });
    }
  }

  onFiltersChanged(filters) {
    this.setState({ filters: filters });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Card>
              <CardText>
                <LanguageSelector
                  languages={languages}
                  onChange={this.handleSelect}
                  selected={this.state.selectedLanguage}
                />
                <TokenSelector
                  tokenTypes={tokenTypes}
                  onChange={this.onFiltersChanged}
                />
              </CardText>
            </Card>
          </div>
          <div className="col-md-5">
            <SnippetArea
              title={this.state.snippetTitle}
              onSaveClick={this.onSaveState}
              contents={this.state.snippet}
              isDialogOpen={this.state.isDialogOpen}
              onTitleChanged={this.onSnippetTitleChanged}
              onSnippetChanged={this.onSnippetChanged}
              toggleConfirmLockDialogVisibility={this.toggleConfirmLockDialogVisibility}
              switchReadOnlyMode={this.switchReadOnlyMode}
              readOnly={this.state.readOnly}
              snippetLanguage={this.state.selectedLanguage}
            />


          </div>
          <div className="col-md-4">
            <TokenInfoPanel />
          </div>
        </div>
      </div>
    );
  }
}

export default AppBody;
