import React from 'react';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { Card, CardText } from 'material-ui/Card';

import SnippetArea from './SnippetArea';
import TokenSelector from './TokenSelector';
import TokenInfoPanel from './TokenInfoPanel';

const languages = [
  { text: 'C', value: 'c' },
  { text: 'Clojure', value: 'clojure' },
  { text: 'COBOL' , value: 'cobol' },
  { text: 'FORTRAN' , value: 'fortran' },
  { text: 'Go' , value: 'go' },
  { text: 'Java' , value: 'java' },
  { text: 'Javascript' , value: 'javascript' },
  { text: 'Perl' , value: 'perl' },
  { text: 'Python' , value: 'python' },
  { text: 'Ruby' , value: 'ruby' },
  { text: 'Scala' , value: 'scala' },
];

class AppBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      langDrawerOpen: false,
      selectedLanguage: ''
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.makeMenuItems = this.makeMenuItems.bind(this);
  }

  handleToggle() {
    this.setState({
      langDrawerOpen: !this.state.langDrawerOpen,
    });
  }

  handleSelect(ev, index, value) {
    this.setState({
      langDrawerOpen: false,
      selectedLanguage: value,
    });
  }

  makeMenuItems() {
    return languages.map((lang, index) => {
      return (
        <MenuItem
          key={`${lang.value}-index`}
          primaryText={lang.text}
          value={lang.value}
        />
      );
    });
  }

  render() {

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Card>
              <CardText>
                <SelectField
                  floatingLabelText="Language"
                  value={this.state.selectedLanguage}
                  onChange={this.handleSelect}
                >
                  <MenuItem value={null} primaryText="" />
                  {this.makeMenuItems()}
                </SelectField>
                <TokenSelector />
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
