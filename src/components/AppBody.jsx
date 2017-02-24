import React from 'react';

import { Card, CardText } from 'material-ui/Card';

import LanguageSelector from './LanguageSelector';
import SnippetArea from './SnippetArea';
import TokenSelector from './TokenSelector';
import TokenInfoPanel from './TokenInfoPanel';

import { parsePython3 } from '../parsers/python3';

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

class AppBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: '',
      snippetEditorMode: '',
      snippetContents: '',
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.onSnippetChanged = this.onSnippetChanged.bind(this);
  }

  handleSelect(ev, index, value) {
    this.setState({
      selectedLanguage: value,
    });
  }

  // Callback to be invoked when user changes snippet title
  onSnippetTitleChanged(ev) {
    const title = ev.target.value;
    console.log('Snippet title is: ' + title);
  }

  // Callback to be invoked when user edits the code snippet
  onSnippetChanged(snippetContents) {
    this.setState({
      snippetContents
    })
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

    // Generate an AST for the current state of the code snippet
    const AST = parser(snippetContents);
    console.log(AST);
    //... Can use this AST to update the snippet text area
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
                />
              </CardText>
            </Card>
          </div>
          <div className="col-md-5">
            <SnippetArea
              contents={this.state.snippetContents}
              onTitleChanged={this.onSnippetTitleChanged}
              onSnippetChanged={this.onSnippetChanged}
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
