import React from 'react';

import mtIcon from '../../res/mt.png';
import twitterIcon from '../../res/twitter.png';
import githubIcon from '../../res/github-icon-blue.png';

const style = {
  paper: {
    padding: '0.7rem',
    display: 'inline-flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  githubLogo: {
    height: '30px',
  },
  twitterLogo: {
    marginTop: 'auto 0',
  },
  linkArea: {
    display: 'inline-flex',
    flexFlow: 'column nowrap',
  },
  logo: {
    height: '30px',
  },
  logoArea: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  link: {
    padding: '0 4px',
    font: '12pt Lato, sans-serif',
  },
  maryvilleDevLogo: {
    marginTop: '1px',
  },
};

const ReferenceArea = () => (
  <div style={style.paper}>
    <a
      style={style.maryvilleDevLogo}
      href="https://maryvilledevcenter.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={mtIcon}
        alt="Maryville DevCenter Logo"
        width={80}
      />
    </a>
    <div style={style.linkArea}>
      <div style={style.logoArea}>
        <a
          style={style.twitterLogo}
          href="https://www.twitter.com/MaryvilleDev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={twitterIcon}
            alt="Twitter Icon"
            width={30}
          />
        </a>
        <a
          style={style.githubLogo}
          href="https://github.com/maryvilledev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={githubIcon}
            alt="Github Icon"
            width={30}
          />
        </a>
      </div>
      <a
        className="contact-link hoverable-link"
        href="mailto:support@codesplain.io"
        target="_blank"
        rel="noopener noreferrer"
        style={style.link}
      >
          Contact Us
        </a>
    </div>
  </div>
);

export default ReferenceArea;
