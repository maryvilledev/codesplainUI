import React from 'react';

import { Card, CardText } from 'material-ui/Card';

import LanguageSelector from './LanguageSelector';
import SnippetArea from './SnippetArea';
import TokenSelector from './TokenSelector';
import TokenInfoPanel from './TokenInfoPanel';

const languages = [
  { text: 'Python' , value: 'python' },
];
//Only python is supported, will add languages as support range grows
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
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(ev, index, value) {
    this.setState({
      selectedLanguage: value,
    });
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
            <SnippetArea />
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
