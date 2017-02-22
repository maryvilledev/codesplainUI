import React from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import SnippetArea from './SnippetArea';
import TokenSelector from './TokenSelector';

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
          <div className="col-md-4">
            <SelectField
              floatingLabelText="Language"
              value={this.state.selectedLanguage}
              onChange={this.handleSelect}
            >
              <MenuItem value={null} primaryText="" />
              {this.makeMenuItems()}
            </SelectField>
            <TokenSelector />
          </div>
          <div className="col-md-8">
            <SnippetArea />
          </div>
        </div>
      </div>
    );
  }
}

export default AppBody;
