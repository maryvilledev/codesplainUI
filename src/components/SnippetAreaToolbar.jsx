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
    display: 'block',
    background: 'rgb(232, 232, 232)', // light grey
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  selectDiv: {
    display: 'inline-block',
  },
  buttonDiv: {
    display: 'inline-block',
    marginTop: '5px',
  },
  titleField: {
    verticalAlign: 'middle',
    width: '275px',
  },
  selectField: {
    verticalAlign: 'middle',
    width: '120px',
  },
  buttons: {
    verticalAlign: 'middle',
    float: 'right',
  }
}

const SnippetAreaToolbar = ({ 
  title, onTitleChange, readOnly, onLockClick, onSaveClick, onSaveAsClick
}) => {
return (
  <div style={styles.toolbar}>
    <TextField
        hintText="Snippet Name"
        value={title}
        onChange={onTitleChange}
        style={styles.titleField}
      />
      <div style={styles.selectDiv}>
        <SelectField
          disabled={true}
          value={1}
          style={styles.selectField}
        >
          <MenuItem value={1} primaryText="Python 3" />
        </SelectField>
      </div>
      <div style={styles.buttonDiv}>
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
      </div>
    </div>
  );
}

export default SnippetAreaToolbar;