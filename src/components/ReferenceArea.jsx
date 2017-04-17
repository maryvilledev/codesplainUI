import React from 'react';

import mtIcon from '../../res/mt.png';
import twitterIcon from '../../res/twitter.png';
import githubIcon from '../../res/github-icon-blue.png';

const style = {
  paper: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    padding: 4,
  },
  linkArea: {
    padding: 2,
    display: 'inline-block',
    font: '12pt Lato, sans-serif',
    verticalAlign: 'bottom',
  },
  logoArea: {
    display: 'block',
    textAlign: 'center',
  },
  link: {
    padding: '4px',
    color: '#666666',
  },
};

const ReferenceArea = () => (
  <div style={style.paper}>
    <a href="https://maryvilledevcenter.com/">
      <img
        src={mtIcon}
        alt="Maryville DevCenter Logo"
        width={80}
      />
    </a>
    <div style={style.linkArea}>
      <div style={style.logoArea}>
        <a
          href="https://www.twitter.com/MaryvilleDev"
          style={style.link}
        >
          <img
            src={twitterIcon}
            alt="Twitter Icon"
            width={30}
          />
        </a>
        <a
          href="https://github.com/maryvilledev"
          style={style.link}
        >
          <img
            src={githubIcon}
            alt="Github Icon"
            width={30}
          />
        </a>
      </div>
      <a
        href="mailto:support@codesplain.io"
        style={style.link}
      >
          Contact Us
        </a>
    </div>
  </div>
);

export default ReferenceArea;
