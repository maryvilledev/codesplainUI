import React from 'react'
import { Paper } from 'material-ui'

import mtIcon from '../../res/mt.png'

const style = {
  paper: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    padding: '1%',
  },
  linkArea: {
    display: 'inline-block',
  },
  link: {
    padding: '4px',
  }
}

const ReferenceArea = () => (
    <Paper style={style.paper}>
      <a href="https://maryvilledevcenter.com/">
      <img
        src={mtIcon}
        alt="Maryville DevCenter Logo"
        width={80}
      />
      </a>
      <div style={style.linkArea}>
      <a
        href="https://github.com/maryvilledev/codesplain/issues"
        style={style.link}
      >
        Report bug
      </a>
      <a
        href="mailto://support.maryville.com"
        style={style.link}
        >
          Contact Us
        </a>
      </div>
    </Paper>
);

export default ReferenceArea;
