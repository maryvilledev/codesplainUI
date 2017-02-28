import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import Save from 'material-ui/svg-icons/content/save';


export default class SaveButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
    this.props.onSaveClick()
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <IconButton
          onTouchTap={this.handleTouchTap}
          tooltip="Save snippet" >
          <Save />
        </IconButton >
        <Snackbar
          open={this.state.open}
          message="Codesplaination Saved!"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
