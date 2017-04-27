import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import { closeNotification } from '../actions/notifications';

export const NotificationSnackbar = (props) => {
  const {
    onRequestClose,
    displaying,
    notification,
  } = props;

  return (
    <Snackbar
      autoHideDuration={5000}
      message={notification}
      onRequestClose={onRequestClose}
      open={displaying}
    />
  );
};

NotificationSnackbar.propTypes = {
  displaying: PropTypes.bool.isRequired,
  notification: PropTypes.string,
  onRequestClose: PropTypes.func.isRequired,
};

NotificationSnackbar.defaultProps = {
  notification: '',
};

const mapDispatchToProps = dispatch => ({
  onRequestClose: () => { dispatch(closeNotification()); },
});

const mapStateToProps = (state) => {
  const {
    notifications: {
      displaying,
      notifications,
    },
  } = state;
  return {
    displaying,
    notification: notifications[0],
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationSnackbar);
