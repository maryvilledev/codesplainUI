import React from 'react';
import { 
  Toolbar, 
  ToolbarGroup, 
  TextField, 
  SelectField, 
  MenuItem 
} from 'material-ui';
import LockButton from '../components/buttons/LockButton';
import SaveMenu from '../components/menus/SaveMenu';

const styles = {
  toolbar: {
    minWidth: '440px',
  },
  titleFieldWrapper: {
    overflow: 'hidden',
  },
  titleField: {
    width: '100%',
  },
  selectField: {
    width: '56%',
  },
}

const SnippetAreaToolbar = ({ 
  title, onTitleChange, readOnly, onLockClick, onSaveClick, onSaveAsClick
}) => {
  return (
    <div>
      <Toolbar>
        <ToolbarGroup>
          <TextField
            hintText="Snippet Name"
            value={title}
            onChange={onTitleChange}
            style={styles.titleField}
          />
        </ToolbarGroup>
        <ToolbarGroup
          lastChild={true}
        >
          <SelectField
            disabled={true}
            value={1}
            style={styles.selectField}
          >
            <MenuItem value={1} primaryText="Python 3" />
          </SelectField>
          <LockButton
            onClick={onLockClick} 
            readOnly={readOnly}
          />
          <SaveMenu 
            onSaveClick={onSaveClick}
            onSaveAsClick={onSaveAsClick}
          />
        </ToolbarGroup>
      </Toolbar>
    </div>
  );
}

export default SnippetAreaToolbar;