import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { IconButton,
         IconMenu, 
         MenuItem, 
         Dialog, 
         TextField,
         FlatButton } from 'material-ui';
import SaveIcon from 'material-ui/svg-icons/content/save';

export default class SaveOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveAsName: '',
      saveAsDialogOpen: false,
    };
  }

  // handleTouchTap() {
  //   this.setState({
  //     open: true,
  //     message: '',
  //   });
  //   this.props.onSaveClick()
  //     .then((res) => {
  //       const id = res.data.id;
  //       browserHistory.push(`/${id}`);
  //       this.setState({ message: 'Codesplaination saved!' });
  //     }, (err) => {
  //       console.error(err);
  //       this.setState({ message: 'Error saving snippet data' });
  //     });
  // }

  // handleRequestClose() {
  //   this.setState({
  //     open: false,
  //   });
  // }

  render() {
    return (
      <div>
        <IconMenu
          iconButtonElement={
            <IconButton
              tooltip="Save Options"
            >
              <SaveIcon />
            </IconButton>
          }
        >
          <MenuItem 
            onTouchTap={this.props.onSaveClick}
            primaryText="Save" 
          />
          <MenuItem 
            onTouchTap={this.props.onSaveAsClick}
            primaryText="Save As" 
          />
        </IconMenu>
        </div>
    );
    //     <Snackbar
    //       open={this.state.open}
    //       message={this.state.message}
    //       autoHideDuration={2000}
    //       onRequestClose={this.handleRequestClose}
    //     />
    //   </div>
    // );
  }
}

SaveOptions.propTypes = {
  onSaveClick: PropTypes.func.isRequired,
  onSaveAsClick: PropTypes.func.isRequired,
};
