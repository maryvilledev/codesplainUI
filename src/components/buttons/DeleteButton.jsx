import React, { PropTypes } from 'react';

import IconButton from 'material-ui/IconButton';
import TrashCan from 'material-ui/svg-icons/action/trash';
import ReactTooltip from 'react-tooltip';

const DeleteButton = ({ onClick, isEnabled }) => {

  return (
    <span>
      <div>
        <IconButton
          id="TrashButton"
          //TODO: disabled
          onTouchTap={onClick}
          //TODO: style
        >
          <Trash />
        </IconButton>
      </div>
    </span>
  )
}
