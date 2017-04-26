import React, { PropTypes } from 'react';
import {
  TextField,
} from 'material-ui';

import LanguageSelector from './LanguageSelector';
import LockButton from './buttons/LockButton';
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
  buttons: {
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
    selectedOrg,
  } = props;

  return (
    <div style={styles.toolbar}>
      <TextField
        hintText="Snippet Name"
        id="titleField"
        fullWidth
        onChange={onTitleChange}
        value={title}
      />
      <div
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
        }}
      >
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
            onSaveAsClick={onSaveAsClick}
            onSaveClick={onSaveClick}
            style={styles.buttons}
            orgs={orgs}
            onOrgChanged={onOrgChanged}
            selectedOrg={selectedOrg}
          />
        </div>
      </div>
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
  orgs: CustomPropTypes.orgs.isRequired,
  selectedOrg: PropTypes.string,
};

SnippetAreaToolbar.defaultProps = {
  selectedOrg: '',
};

export default SnippetAreaToolbar;
