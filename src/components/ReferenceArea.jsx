import React from 'react'

import mtIcon from '../../res/mt.png'
import twitterIcon from '../../res/twitter.png'
import githubIcon from '../../res/github-icon-blue.png'

const style = {
  paper: {
    position: 'fixed',
    bottom: 0,
    right: 0,
  },
  linkArea: {
    display: 'inline-block',
    font: '12pt Lato, sans-serif',
  },
  link: {
    padding: '4px',
    color: '#00BCD4',
  }
}

const ReferenceArea = () => (
    <div style={style.paper}>
      <a href="https://maryvilledevcenter.com/">
      <img
        src={mtIcon}
        alt="Maryville DevCenter Logo"
        width={80}
      />
      </a>
      <a href="https://www.twitter.com/MaryvilleTech"
      style={style.link}>
        <img
          src={twitterIcon}
          alt="Twitter Icon"
          width={30}
        />
      </a>
      <a href="https://github.com/maryvilledev"
      style={style.link}>
        <img
          src={githubIcon}
          alt="Github Icon"
          width={30}
        />
      </a>
      <div style={style.linkArea}>
      <a
        href="mailto://support.maryville.com"
        style={style.link}
        >
          Contact Us
        </a>
      </div>
    </div>
);

export default ReferenceArea;
