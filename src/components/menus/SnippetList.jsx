import React, { Component, PropTypes } from 'react';
import Moment from 'react-moment';
import { MenuItem } from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { mapLanguage } from '../../util/rules';
import CustomPropTypes from '../../util/custom-prop-types';

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

const makeItemDiv = ({ snippetTitle, language, lastEdited }) => (
  <table style={styles.menuItem}>
    <tbody>
      <tr>
        <td style={styles.title}>{makeDisplayTitle(snippetTitle)}</td>
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

const makeMenuItems = (snippetOwner, snippetsList, onClick) => {
  if (Object.keys(snippetsList).length === 0) {
    return null;
  }
  return Object.keys(snippetsList).map(snippetKey => (
    <MenuItem
      key={snippetKey}
      onTouchTap={() => onClick(snippetOwner, snippetKey)}
      primaryText={makeItemDiv(snippetsList[snippetKey])}
    />
  ));
};

class SnippetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusState: 'none',
    };
    this.handleOnTouchTap = this.handleOnTouchTap.bind(this);
  }

  componentWillUnmount() {
    this.setState({ focusState: 'none' });
  }

  handleOnTouchTap() {
    this.setState({
      focusState: 'focused',
    });
  }

  render() {
    const {
      onClick,
      primaryText,
      snippetOwner,
      snippetsList,
    } = this.props;
    const {
      focusState,
    } = this.state;
    const menuItems = makeMenuItems(snippetOwner, snippetsList, onClick);
    return (
      <MenuItem
        disabled={!menuItems}
        focusState={focusState}
        menuItems={menuItems}
        onTouchTap={this.handleOnTouchTap}
        primaryText={primaryText}
        rightIcon={<ArrowDropRight />}
      />
    );
  }
}

SnippetList.propTypes = {
  onClick: PropTypes.func.isRequired,
  primaryText: PropTypes.string.isRequired,
  snippetsList: CustomPropTypes.snippets.isRequired,
  snippetOwner: PropTypes.string.isRequired,
};

export default SnippetList;
