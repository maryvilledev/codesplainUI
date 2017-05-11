import React, { PropTypes } from 'react';
import {
  TextField,
  Avatar,
} from 'material-ui';

import LanguageSelector from './LanguageSelector';
import LockButton from './buttons/LockButton';
import SaveMenu from './menus/SaveMenu';
import CustomPropTypes from '../util/custom-prop-types';

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
  avatar: {
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
    selectedOrg,
    avatarUrl,
  } = props;

  return (
    <div style={styles.toolbar}>
      <div style={styles.avatar}>
        {(avatarUrl) ?
          <Avatar
            size={30}
            src={avatarUrl}
          />
        : null}
      </div>
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
