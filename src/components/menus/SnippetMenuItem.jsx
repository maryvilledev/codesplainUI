import React, { PropTypes } from 'react';
import Moment from 'react-moment';

import { mapLanguage } from '../../util/rules';

const styles = {
  menuItem: {
    width: '350px',
  },
  title: {
    width: '50%',
  },
  language: {
    float: 'left',
    fontSize: '80%',
  },
  lastEdited: {
    float: 'right',
    fontSize: '80%',
  },
};

// Truncates the title if it is too long to fit in snippets dropdown
const makeDisplayTitle = (title) => {
  if (title.length > 10) {
    return `${title.substring(0, 12)}...`;
  }
  return title;
};

const SnippetMenuItem = ({ snippetTitle, language, lastEdited }) => (
  <table style={styles.menuItem}>
    <tr>
      <td style={styles.title}>{makeDisplayTitle(snippetTitle)}</td>
      <td style={styles.language}>
        {mapLanguage[language]}
      </td>
      <td style={styles.lastEdited}>
        <Moment fromNow ago>{lastEdited}</Moment>
      </td>
    </tr>
  </table>
);

export default SnippetMenuItem;
