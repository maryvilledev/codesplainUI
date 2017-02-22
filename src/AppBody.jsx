import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const languages = [
  'Brainfuck',
  'C',
  'Clojure',
  'COBOL',
  'FORTRAN',
  'Go',
  'Java',
  'Javascript',
  'Perl',
  'Python',
  'Ruby',
  'Scala',
];

class AppBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      langDrawerOpen: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.makeMenuItems = this.makeMenuItems.bind(this);
  }

  handleToggle() {
    this.setState({
      langDrawerOpen: !this.state.langDrawerOpen,
    });
  }

  handleClose() {
    this.setState({
      langDrawerOpen: false,
    });
  }

  makeMenuItems() {
    return languages.map((lang, index) => {
      return (
        <MenuItem
          key={`${lang} index`}
          onTouchTap={this.handleClose}
        >
          {lang}
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
          width={100}
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
