import React from 'react';
import { browserHistory } from 'react-router'
import { Card, CardText } from 'material-ui/Card';
import LanguageSelector from './LanguageSelector';
import SnippetArea from './SnippetArea';
import TokenSelector from './TokenSelector';
import AnnotationPanel from './AnnotationPanel';
import axios from 'axios'

const languages = [
  { text: 'Python 3' , value: 'python3' },
];

const styles = {
  card: {
    width: '90%'
  },
  snippetArea: {
    margin: '20%'
  },
  selector: {
    width: 20
  }
}

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
    this.editAnnotation = this.editAnnotation.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onFiltersChanged = this.onFiltersChanged.bind(this);
    this.onGutterClick = this.onGutterClick.bind(this);
    this.onSaveState = this.onSaveState.bind(this);
    this.onSnippetChanged = this.onSnippetChanged.bind(this);
    this.onSnippetTitleChanged = this.onSnippetTitleChanged.bind(this);
    this.saveAnnotation = this.saveAnnotation.bind(this);
    this.switchReadOnlyMode = this.switchReadOnlyMode.bind(this);
    this.onParserRun = this.onParserRun.bind(this);
  }

  onGutterClick(codeMirrorInstance, lineNumber) {
    // this.snippetArea.emphasizeLine(this.state.snippet, lineNumber);
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
        annotation: this.state.annotations[String(lineNumber)],
        closeAnnotation: this.closeAnnotation,
        editAnnotation: this.editAnnotation,
        lineNumber,
        lineText: codeMirrorInstance.getLine(lineNumber),
        snippetLanguage: this.state.selectedLanguage,
      },
    });
  }

  closeAnnotation() {
    this.snippetArea.triggerHighlight(
      this.state.snippet,
      this.state.AST,
      this.state.filters
    );
    this.setState({
      annotationDisplay: 'none',
      annotationDisplayProps: {},
    });
  }

  editAnnotation() {
    this.setState({
      annotationDisplay: 'create',
      annotationDisplayProps: {
        ...this.state.annotationDisplayProps,
        saveAnnotation: this.saveAnnotation,
      }
    })
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
    const {snippet, snippetTitle, annotations, AST, filters, readOnly} = this.state;
    const obj = {snippet, snippetTitle, annotations, AST, filters, readOnly};
    const stateString = JSON.stringify(obj);
    return axios.post('/api/snippets/', { json : stateString });
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
  onSnippetChanged(snippet, AST, filters) {
    this.setState({ snippet });
  }

  // Callback to be invoked when the SnippetArea's 'daemon' runs the parser
  onParserRun(AST, filters) {
    this.setState({ AST, filters });
  }

  onFiltersChanged(token, checked) {
    const newFilters = this.state.filters;
    newFilters[token].selected = checked;
    // Highlight the code snippet and update state
    this.snippetArea.triggerHighlight(
      this.state.snippet,
      this.state.AST,
      newFilters
    );
    this.setState({ filters: newFilters });
  }

  saveAnnotation(lineNumber, lineText, annotation) {
    const annotations = this.state.annotations;
    this.setState({
      annotations: {
        ...annotations,
        [lineNumber]: annotation,
      },
      annotationDisplay: 'display',
      annotationDisplayProps: {
        ...this.state.annotationDisplayProps,
        annotation,
        closeAnnotation: this.closeAnnotation,
        editAnnotation: this.editAnnotation,
      },
    });
  }

  render() {
    const infoPanelPrompt = this.state.readOnly ?
      'Click on a line number to add an annotation or display one' :
      'Lock this snippet to add annotations';
    return (
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-2"
            style={styles.selector}
            >
            <Card style={styles.card}>
              <CardText>
                <LanguageSelector
                  languages={languages}
                  onChange={this.handleSelect}
                  selected={this.state.selectedLanguage}
                />
                <TokenSelector
                  tokens={this.state.filters}
                  onChange={this.onFiltersChanged}
                />
              </CardText>
            </Card>
          </div>
          <div className="col-md-5">
            <SnippetArea
              ref={sa => {this.snippetArea = sa}}
              style={styles.snippetArea}
              annotatedLines={Object.keys(this.state.annotations)}
              contents={this.state.snippet}
              onGutterClick={this.onGutterClick}
              onSaveClick={this.onSaveState}
              onSnippetChanged={this.onSnippetChanged}
              onTitleChanged={this.onSnippetTitleChanged}
              onParserRun={this.onParserRun}
              readOnly={this.state.readOnly}
              snippetLanguage={this.state.selectedLanguage}
              switchReadOnlyMode={this.switchReadOnlyMode}
              title={this.state.snippetTitle}
              filters={this.state.filters}
              emphasizeLine={this.state.annotationDisplayProps.lineNumber}
            />
          </div>
          <div className="col-md-5">
            <AnnotationPanel
              displayProps={this.state.annotationDisplayProps}
              displayStatus={this.state.annotationDisplay}
              prompt={infoPanelPrompt}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AppBody;
