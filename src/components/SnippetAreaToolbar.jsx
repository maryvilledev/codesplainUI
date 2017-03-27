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
    height: '7.5%',
    listStyleType: 'none',
    margin: '0',
    overflow: 'auto',
    padding: '0',
  },
  toolbarItem: {
    display: 'block',
    float: 'left',
    padding: '5px 10px',
  },
  titleField: {
    verticalAlign: 'middle',
    width: '225px',
  },
  selectField: {
    verticalAlign: 'middle',
    width: '120px',
  },
  buttons: {
    verticalAlign: 'middle',
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
  <ul style={styles.toolbar}>
    <li style={styles.toolbarItem}>
      <TextField
        id="titleField"
        hintText="Snippet Name"
        value={title}
        onChange={onTitleChange}
        style={styles.titleField}
      />
    </li>
    <li style={styles.toolbarItem}>
      <SelectField
        id="languageSelector"
        disabled={true}
        value={1}
        style={styles.selectField}
      >
        <MenuItem value={1} primaryText="Python 3" />
      </SelectField>
    </li>
    <li style={styles.toolbarItem}>
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
    </li>
  </ul>
);

SnippetAreaToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  onLockClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onSaveAsClick: PropTypes.func.isRequired,
}

export default SnippetAreaToolbar;
