import React, { PropTypes } from 'react';
import memoize from 'lodash/memoize';
import {
  IconButton,
  IconMenu,
  MenuItem,
} from 'material-ui';
import KeyboardIcon from 'material-ui/svg-icons/hardware/keyboard';
import ReactTooltip from 'react-tooltip';

const keymapOptions = [
  ['Default', 'default'],
  ['Emacs', 'emacs'],
  ['Vim', 'vim'],
  ['Sublime Text', 'sublime'],
];

const makeKeybindingOptions = memoize(() => (
  keymapOptions.map(([primaryText, value]) => (
    <MenuItem key={value} primaryText={primaryText} value={value} />
  ))
));

const KeymapPicker = (props) => {
  const {
    selectedKeymap,
    onChange,
  } = props;
  return (
    <span data-tip data-for="keymap-picker-tooltip">
      <IconMenu
        iconButtonElement={<IconButton><KeyboardIcon /></IconButton>}
        onChange={onChange}
        value={selectedKeymap}
      >
        {makeKeybindingOptions()}
      </IconMenu>
      <ReactTooltip
        id="keymap-picker-tooltip"
        effect="solid"
        place="bottom"
      >
        Select your keymap
      </ReactTooltip>
    </span>
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
