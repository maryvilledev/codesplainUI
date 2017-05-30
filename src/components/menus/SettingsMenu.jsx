import React, { PropTypes } from 'react';
import {
  IconButton,
  IconMenu,
} from 'material-ui';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import DeleteMenu from './DeleteMenu';
import KeymapPicker from './KeymapPicker';
import ThemePicker from './ThemePicker';

const SETTINGS_ICON_BUTTON = <IconButton><SettingsIcon /></IconButton>;

const SettingsMenu = (props) => {
  const {
    codeMirrorTheme,
    deleteEnabled,
    onDeleteClick,
    onKeymapChange,
    onThemeChange,
    selectedKeymap,
  } = props;
  return (
    <IconMenu
      iconButtonElement={SETTINGS_ICON_BUTTON}
    >
      <ThemePicker
        codeMirrorTheme={codeMirrorTheme}
        onChange={onThemeChange}
      />
      <KeymapPicker
        selectedKeymap={selectedKeymap}
        onChange={onKeymapChange}
      />
      { deleteEnabled ? <DeleteMenu onDeleteClick={onDeleteClick} /> : null }
    </IconMenu>
  );
};

SettingsMenu.propTypes = {
  codeMirrorTheme: PropTypes.string,
  deleteEnabled: PropTypes.bool.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onKeymapChange: PropTypes.func.isRequired,
  onThemeChange: PropTypes.func.isRequired,
  selectedKeymap: PropTypes.string,
};

SettingsMenu.defaultProps = {
  codeMirrorTheme: 'codesplain',
  selectedKeymap: 'default',
};

export default SettingsMenu;
