import React, { PropTypes } from 'react';
import {
  TextField,
} from 'material-ui';

import AuthorAvatarIcon from './AuthorAvatarIcon';
import LanguageSelector from './LanguageSelector';
import LockButton from './buttons/LockButton';
import DeleteButton from './buttons/DeleteButton';
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
  buttonsContainer: {
    display: 'inline-flex',
  },
  button: {
    flex: '1 1 auto',
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
    canEdit,
    deleteEnabled,
    language,
    onDeleteClick,
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
          onChange={onTitleChange}
          style={styles.toolbarField}
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
            onOrgChanged={onOrgChanged}
            onSaveAsClick={onSaveAsClick}
            onSaveClick={onSaveClick}
            orgs={orgs}
            selectedOrg={selectedOrg}
            style={styles.button}
          />
          <DeleteButton
            style={styles.button}
            isEnabled={deleteEnabled}
            onClick={onDeleteClick}
          />
        </div>
      </div>
    </div>
  );
};

SnippetAreaToolbar.propTypes = {
  author: PropTypes.string,
  avatarUrl: PropTypes.string,
  canEdit: PropTypes.bool.isRequired,
  deleteEnabled: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
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
