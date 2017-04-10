import React from 'react'
import { Paper } from 'material-ui'

import mtIcon from '../../res/mt.png'

const style = {
  area: {
    position: 'fixed',
    bottom: 0,
    right: 0
  },
  paper: {
    padding: '3%'
  }
}

const ReferenceArea = () => (
  <span style={style.area}>
    <Paper style={style.paper}>
      <a href="https://maryvilledevcenter.com/">
      <img
        src={mtIcon}
        alt="Maryville DevCenter Logo"
        width={80}
      />
      </a>
      <a href="https://github.com/maryvilledev/codesplain/issues">
        Report bug
      </a>
      <a href="mailto://support.maryville.com">Contact Us</a>
    </Paper>
  </span>
);

export default ReferenceArea;
