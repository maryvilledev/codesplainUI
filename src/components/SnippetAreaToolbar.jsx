import React, { PropTypes } from 'react';
import {
  TextField,
} from 'material-ui';

import LanguageSelector from './LanguageSelector';
import LockButton from './buttons/LockButton';
import SaveMenu from './menus/SaveMenu';
import OrgSelector from './OrgSelector';

const styles = {
  toolbar: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: '1',
    flexShrink: '0',
    margin: '0',
    padding: '0',
  },
  buttons: {
    flexBasis: 'auto',
    flexGrow: '1',
    flexShrink: '1',
    verticalAlign: 'middle',
  },
  toolbarField: {
    flexBasis: 'auto',
    flexGrow: '1',
    flexShrink: '1',
    verticalAlign: 'middle',
  },
};

/*
https://www.w3schools.com/Css/css_navbar.asp
Note that the Material UI <Toolbar /> component does not work
here, because it does not reflow correctly when the screen is resized.
*/
const SnippetAreaToolbar = (props) => {
  const {
    canSave,
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
    selectedOrg
  } = props;

  return (
    <div style={styles.toolbar}>
      <TextField
        hintText="Snippet Name"
        id="titleField"
        onChange={onTitleChange}
        style={styles.toolbarField}
        value={title}
      />
      <LanguageSelector
        disabled={readOnly}
        language={language}
        onChange={onLanguageChange}
        style={styles.toolbarField}
      />
      <LockButton
        onClick={onLockClick}
        readOnly={readOnly}
        style={styles.buttons}
      />
      <OrgSelector
        onChange={onOrgChanged}
        orgs={orgs}
        value={selectedOrg}
        style={styles.toolbarField}
      />
      <SaveMenu
        canSave={canSave}
        enabled={saveEnabled}
        id="saveMenu"
        onSaveAsClick={onSaveAsClick}
        onSaveClick={onSaveClick}
        style={styles.buttons}
      />
    </div>
  );
};

SnippetAreaToolbar.propTypes = {
  canSave: PropTypes.bool.isRequired,
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
  orgs: PropTypes.array.isRequired,
  selectedOrg: PropTypes.string
};

export default SnippetAreaToolbar;
