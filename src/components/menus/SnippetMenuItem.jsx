import React, { PropTypes } from 'react';
import Moment from 'react-moment';

import { mapLanguage } from '../../util/rules';

const styles = {
  menuItem: {
    width: '100%',
  },
  title: {
    width: '13em',
  },
  role: {
    width: '17em',
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
const makeDisplayTitle = (title, dist) => {
  if (title.length > dist) {
    return `${title.substring(0, dist)}...`;
  }
  return title;
};

const SnippetMenuItem = ({ snippetTitle, language, lastEdited, role }) => (
  <table style={styles.menuItem}>
    <tbody>
      <tr>
        <td style={styles.title}>{makeDisplayTitle(snippetTitle, 10)}</td>
        {
        role ?
          <td style={styles.role}>
            {makeDisplayTitle(role, 14)}
          </td>
        : null
      }
        <td style={styles.language}>
          {mapLanguage[language]}
        </td>
        <td style={styles.lastEdited}>
          <Moment fromNow ago>{lastEdited}</Moment>
        </td>
      </tr>
    </tbody>
  </table>
);

SnippetMenuItem.propTypes = {
  snippetTitle: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  lastEdited: PropTypes.number.isRequired,
  role: PropTypes.string,
};

SnippetMenuItem.defaultProps = {
  role: '',
};

export default SnippetMenuItem;
