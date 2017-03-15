import React from 'react';
import {
  TextField, 
  SelectField, 
  MenuItem 
} from 'material-ui';
import LockButton from '../components/buttons/LockButton';
import SaveMenu from '../components/menus/SaveMenu';

const styles = {
  toolbar: {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  toolbarItem: {
    float: 'left',
    display: 'block',
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
here, because it does not reflow correctly when the screen is 
resized.
*/
const SnippetAreaToolbar = ({ 
  title, onTitleChange, readOnly, onLockClick, onSaveClick, onSaveAsClick
}) => (
  <ul style={styles.toolbar}>
    <li style={styles.toolbarItem}>
      <TextField
        hintText="Snippet Name"
        value={title}
        onChange={onTitleChange}
        style={styles.titleField}
      />
    </li>
    <li style={styles.toolbarItem}>
      <SelectField
        disabled={true}
        value={1}
        style={styles.selectField}
      >
        <MenuItem value={1} primaryText="Python 3" />
      </SelectField>
    </li>
    <li style={styles.toolbarItem}>
      <LockButton
        onClick={onLockClick} 
        readOnly={readOnly}
        style={styles.buttons}
      />
      <SaveMenu 
        onSaveClick={onSaveClick}
        onSaveAsClick={onSaveAsClick}
        style={styles.buttons}
      />
    </li>
  </ul>
);

export default SnippetAreaToolbar;