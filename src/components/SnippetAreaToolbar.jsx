import React, {PropTypes} from 'react';
import {
  MenuItem,
  SelectField,
  TextField,
} from 'material-ui';
import LockButton from '../components/buttons/LockButton';
import SaveMenu from '../components/menus/SaveMenu';

const styles = {
  toolbar: {
    backgroundColor: 'transparent',
    margin: '0',
    padding: '0',
  },
  buttons: {
  },
  toolbarField: {
    width: '100%'
  },
}

/*
https://www.w3schools.com/Css/css_navbar.asp
Note that the Materual UI <Toolbar /> component does not work
here, because it does not reflow correctly when the screen is resized.
*/
const SnippetAreaToolbar = ({
  title, onTitleChange, readOnly, onLockClick, onSaveClick, onSaveAsClick
}) => (
  <div style={styles.toolbar}>
    <TextField
      hintText="Snippet Name"
      id="titleField"
      onChange={onTitleChange}
      style={styles.toolbarField}
      value={title}
    />
    <SelectField
      disabled={true}
      id="languageSelector"
      style={styles.toolbarField}
      value={1}
    >
      <MenuItem value={1} primaryText="Python 3" />
    </SelectField>
    <LockButton
      id="lockButton"
      onClick={onLockClick}
      readOnly={readOnly}
      style={styles.buttons}
    />
    <SaveMenu
      id="saveMenu"
      onSaveClick={onSaveClick}
      onSaveAsClick={onSaveAsClick}
      style={styles.buttons}
    />
  </div>
);

SnippetAreaToolbar.propTypes = {
  onLockClick: PropTypes.func.isRequired,
  onSaveAsClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
}

export default SnippetAreaToolbar;
