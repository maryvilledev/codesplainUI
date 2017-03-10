import React from 'react';
import { Dialog, FlatButton } from 'material-ui';

const styles = {
  errorDialogOverlay: {
    background: '#990000', // Crimson red
  },
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
      overlayStyle={isError? styles.errorDialogOverlay: null}
    >
      {text}
    </Dialog>
);

export default Alert
