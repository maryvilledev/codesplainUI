import React from 'react';
import { Dialog, FlatButton } from 'material-ui';
import { red500 } from 'material-ui/styles/colors';

const styles = {
  bodyError: {
    background: red500, 
    color: '#000000',
  },
  actionsContainerError: {
    background: red500,
  }
}

/*
<Alert /> renders as a <Dialog /> with an OK button. It displays the text
specified in the 'text' prop, and invokes the 'onClose' prop when it is closed.
Setting the 'isError' prop to true causes its background to be rendered as a
crimson red.
*/
const Alert = ({ isError, text, onClose }) => (
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
      actionsContainerStyle={isError? styles.actionsContainerError: null}
      bodyStyle={isError ? styles.bodyError : null}
    >
      {text}
    </Dialog>
);

export default Alert
