import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import IconButton from 'material-ui/IconButton';
import Save from 'material-ui/svg-icons/content/save';
import Snackbar from 'material-ui/Snackbar';

export default class SaveButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: '',
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap() {
    this.setState({
      open: true,
      message: '',
    });
    this.props.onSaveClick()
      .then((res) => {
        const id = res.data.id;
        browserHistory.push(`/${id}`);
        this.setState({ message: 'Codesplaination saved!' });
      }, (err) => {
        console.error(err);
        this.setState({ message: 'Error saving snippet data' });
      });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div>
        <IconButton
          onTouchTap={this.handleTouchTap}
          tooltip="Save snippet"
        >
          <Save />
        </IconButton>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

SaveButton.propTypes = {
  onSaveClick: PropTypes.func.isRequired,
};
