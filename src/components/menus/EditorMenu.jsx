import React, { PropTypes } from 'react';
import {
  IconButton,
  IconMenu,
  MenuItem,
} from 'material-ui';
import PaletteIcon from 'material-ui/svg-icons/image/palette';

import codeMirrorThemeOptions from '../../util/codemirror-theme-options';

const makeEditorMenuItems = () => (
  codeMirrorThemeOptions.map(([displayName, value]) => (
    <MenuItem
      key={value}
      primaryText={displayName}
      value={value}
    />
  ))
);

const EditorMenu = (props) => {
  const {
    codeMirrorTheme,
    onChange,
  } = props;
  return (
    <IconMenu
      iconButtonElement={<IconButton><PaletteIcon /></IconButton>}
      onChange={onChange}
      value={codeMirrorTheme}
    >
      <MenuItem
        primaryText="Codesplain"
        value="codesplain"
      />
      {makeEditorMenuItems()}
    </IconMenu>
  );
};

EditorMenu.propTypes = {
  codeMirrorTheme: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

EditorMenu.defaultProps = {
  codeMirrorTheme: 'codesplain',
};

export default EditorMenu;
