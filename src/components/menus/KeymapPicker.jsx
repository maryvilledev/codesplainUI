import React, { PropTypes } from 'react';
import memoize from 'lodash/memoize';
import {
  MenuItem,
} from 'material-ui';
import KeyboardIcon from 'material-ui/svg-icons/hardware/keyboard';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const keymapOptions = [
  ['Default', 'default'],
  ['Emacs', 'emacs'],
  ['Vim', 'vim'],
  ['Sublime Text', 'sublime'],
];

const makeKeybindingOptions = memoize((selected, onChange) => (
  keymapOptions.map(([primaryText, value]) => (
    <MenuItem
      checked={value === selected}
      key={value}
      primaryText={primaryText}
      value={value}
      onTouchTap={() => { onChange(value); }}
    />
  ))
));

const KeymapPicker = (props) => {
  const {
    selectedKeymap,
    onChange,
  } = props;
  return (
    <MenuItem
      leftIcon={<KeyboardIcon />}
      rightIcon={<ArrowDropRight />}
      primaryText="Keymap"
      onChange={onChange}
      menuItems={makeKeybindingOptions(selectedKeymap, onChange)}
    />
  );
};

KeymapPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedKeymap: PropTypes.string,
};

KeymapPicker.defaultProps = {
  selectedKeymap: 'default',
};

export default KeymapPicker;
