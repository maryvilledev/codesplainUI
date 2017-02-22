import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

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
      selectedLanguage: 'python'
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

  handleSelect(selectedLanguage) {
    this.setState({
      langDrawerOpen: false,
      selectedLanguage,
    });
  }

  makeMenuItems() {
    return languages.map((lang, index) => {
      return (
        <MenuItem
          checked={ lang.value === this.state.selectedLanguage }
          key={`${lang.value} index`}
          onTouchTap={() => this.handleSelect(lang.value)}
          value={`${lang.value}`}

        >
          {lang.text}
        </MenuItem>
      );
    });
  }

  render() {

    return (
      <div>
        <RaisedButton
          label="Select snippet language"
          onTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={250}
          open={this.state.langDrawerOpen}
          onRequestChange={(langDrawerOpen) => this.setState({langDrawerOpen})}
        >
          {this.makeMenuItems()}
        </Drawer>
      </div>
    );
  }
}

export default AppBody;
