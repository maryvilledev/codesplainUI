import React, { PropTypes } from 'react';
import {
  TextField,
  Avatar,
} from 'material-ui';
import ReactTooltip from 'react-tooltip';

import LanguageSelector from './LanguageSelector';
import LockButton from './buttons/LockButton';
import DeleteButton from './buttons/DeleteButton';
import SaveMenu from './menus/SaveMenu';
import CustomPropTypes from '../util/custom-prop-types';

const styles = {
  toolbar: {
    backgroundColor: 'transparent',
    display: 'flex',
    flex: '1 0 auto',
    flexFlow: 'column wrap',
    margin: '0',
    padding: '0',
  },
  buttonsContainer: {
    display: 'inline-flex',
  },
  button: {
    flex: '1 1 auto',
  },
  toolbarField: {
    flex: '1 1 auto',
  },
  row: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  avatar: {
    flexBasis: 'auto',
    verticalAlign: 'bottom',
    paddingTop: '10px',
    margin: '3px',
    marginLeft: '20px',
  },
};

/*
https://www.w3schools.com/Css/css_navbar.asp
Note that the Material UI <Toolbar /> component does not work
here, because it does not reflow correctly when the screen is resized.
*/
const SnippetAreaToolbar = (props) => {
  const {
    canEdit,
    language,
    onLanguageChange,
    onLockClick,
    onSaveAsClick,
    onSaveClick,
    onTitleChange,
    onOrgChanged,
    readOnly,
    saveEnabled,
    title,
    orgs,
    selectedOrg,
    avatarUrl,
    author,
  } = props;

  return (
    <div style={styles.toolbar}>
      <div style={styles.row}>
        <TextField
          hintText="Snippet Name"
          id="titleField"
          style={styles.toolbarField}
          onChange={onTitleChange}
          value={title}
        />
        <div
          style={styles.avatar}
          data-tip
          data-for="avatar"
        >
          {(avatarUrl) ?
            <Avatar
              size={20}
              src={avatarUrl}
            />
        : null}
        </div>
        <ReactTooltip
          id="avatar"
          effect="solid"
          place="bottom"
        >
          {author}
        </ReactTooltip>
      </div>
      <div style={styles.row} >
        <LanguageSelector
          disabled={readOnly}
          language={language}
          onChange={onLanguageChange}
          style={styles.toolbarField}
        />
      <div style={styles.buttonsContainer}>
          <LockButton
            onClick={onLockClick}
            readOnly={readOnly}
            style={styles.button}
          />
          <SaveMenu
            canSave={canEdit}
            enabled={saveEnabled}
            id="saveMenu"
            onSaveAsClick={onSaveAsClick}
            onSaveClick={onSaveClick}
            style={styles.button}
            orgs={orgs}
            onOrgChanged={onOrgChanged}
            selectedOrg={selectedOrg}
          />
          <DeleteButton
            style={styles.button}
            isEnabled={canEdit}
            onClick={() => console.log('tickle')}
          />
        </div>
      </div>
    </div>
  );
};

SnippetAreaToolbar.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  onLockClick: PropTypes.func.isRequired,
  onSaveAsClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onOrgChanged: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  saveEnabled: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  orgs: CustomPropTypes.orgs.isRequired,
  selectedOrg: PropTypes.string,
  avatarUrl: PropTypes.string,
  author: PropTypes.string,
};

SnippetAreaToolbar.defaultProps = {
  selectedOrg: '',
  avatarUrl: null,
  author: '',
};

export default SnippetAreaToolbar;
