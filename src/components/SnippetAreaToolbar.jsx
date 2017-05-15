import React, { PropTypes } from 'react';
import {
  TextField,
} from 'material-ui';

import AuthorAvatarIcon from './AuthorAvatarIcon';
import LanguageSelector from './LanguageSelector';
import LockButton from './buttons/LockButton';
import SaveMenu from './menus/SaveMenu';
import CustomPropTypes from '../util/custom-prop-types';

const styles = {
  buttons: {
    flex: '1 1 auto',
  },
  row: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  toolbar: {
    backgroundColor: 'transparent',
    display: 'flex',
    flex: '1 0 auto',
    flexFlow: 'column wrap',
    margin: '0',
    padding: '0',
  },
  toolbarField: {
    flex: '1 1 auto',
  },
};

/*
https://www.w3schools.com/Css/css_navbar.asp
Note that the Material UI <Toolbar /> component does not work
here, because it does not reflow correctly when the screen is resized.
*/
const SnippetAreaToolbar = (props) => {
  const {
    author,
    avatarUrl,
    canSave,
    language,
    onLanguageChange,
    onLockClick,
    onOrgChanged,
    onSaveAsClick,
    onSaveClick,
    onTitleChange,
    orgs,
    readOnly,
    saveEnabled,
    selectedOrg,
    title,
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
        <AuthorAvatarIcon
          author={author}
          avatarUrl={avatarUrl}
        />
      </div>
      <div style={styles.row} >
        <LanguageSelector
          disabled={readOnly}
          language={language}
          onChange={onLanguageChange}
          style={styles.toolbarField}
        />
        <div>
          <LockButton
            onClick={onLockClick}
            readOnly={readOnly}
            style={styles.buttons}
          />
          <SaveMenu
            canSave={canSave}
            enabled={saveEnabled}
            id="saveMenu"
            onOrgChanged={onOrgChanged}
            onSaveAsClick={onSaveAsClick}
            onSaveClick={onSaveClick}
            orgs={orgs}
            selectedOrg={selectedOrg}
            style={styles.buttons}
          />
        </div>
      </div>
    </div>
  );
};

SnippetAreaToolbar.propTypes = {
  author: PropTypes.string,
  avatarUrl: PropTypes.string,
  canSave: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  onLockClick: PropTypes.func.isRequired,
  onOrgChanged: PropTypes.func.isRequired,
  onSaveAsClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  orgs: CustomPropTypes.orgs.isRequired,
  readOnly: PropTypes.bool.isRequired,
  saveEnabled: PropTypes.bool.isRequired,
  selectedOrg: PropTypes.string,
  title: PropTypes.string.isRequired,
};

SnippetAreaToolbar.defaultProps = {
  author: '',
  avatarUrl: '',
  selectedOrg: '',
};

export default SnippetAreaToolbar;
