import React, { PropTypes } from 'react';
import {
  Dialog,
  FlatButton,
} from 'material-ui';

/*
<Alert /> renders as a <Dialog /> with an OK button. It displays the text
specified in the 'text' prop, and invokes the 'onClose' prop when it is closed.
Setting the 'isError' prop to true causes its background to be rendered as a
crimson red.
*/
const Alert = ({ onClose, text }) => (
    <Dialog
      actions={
        <FlatButton
          label="OK"
          primary={true}
          onTouchTap={onClose}
        />
      }
      modal={false}
      open={true}
      onRequestClose={onClose}
    >
      {text}
    </Dialog>
);

Alert.propTypes = {
  onClose: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Alert;
