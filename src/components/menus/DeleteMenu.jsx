import React, { PropTypes } from 'react';
import { MenuItem } from 'material-ui';
import TrashCan from 'material-ui/svg-icons/action/delete';
import { red500 } from 'material-ui/styles/colors';

const styles = {
  text: {
    color: 'red',
  },
};

const DeleteMenu = (props) => {
  const {
    onDeleteClick,
  } = props;
  return (
    <MenuItem
      leftIcon={<TrashCan color={red500} />}
      primaryText="Delete Snippet"
      onTouchTap={onDeleteClick}
      style={styles.text}
    />
  );
};

DeleteMenu.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
};

export default DeleteMenu;
