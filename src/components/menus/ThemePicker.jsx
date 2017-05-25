import React, { PropTypes } from 'react';
import {
  IconButton,
  IconMenu,
  MenuItem,
} from 'material-ui';
import memoize from 'lodash/memoize';
import ReactTooltip from 'react-tooltip';
import PaletteIcon from 'material-ui/svg-icons/image/palette';

import codeMirrorThemeOptions from '../../util/codemirror-theme-options';

const makeThemePickerItems = memoize(() => (
  codeMirrorThemeOptions.map(([displayName, value]) => (
    <MenuItem key={value} primaryText={displayName} value={value} />
  ))
));

const ThemePicker = (props) => {
  const { codeMirrorTheme, onChange } = props;
  return (
    <span data-tip data-for="theme-picker-tooltip">
      <IconMenu
        iconButtonElement={<IconButton><PaletteIcon /></IconButton>}
        onChange={onChange}
        value={codeMirrorTheme}
      >
        <MenuItem primaryText="Codesplain" value="codesplain" />
        {makeThemePickerItems()}
      </IconMenu>
      <ReactTooltip
        id="theme-picker-tooltip"
        effect="solid"
        place="bottom"
      >
        Select a theme
      </ReactTooltip>
    </span>
  );
};

ThemePicker.propTypes = {
  codeMirrorTheme: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

ThemePicker.defaultProps = {
  codeMirrorTheme: 'codesplain',
};

export default ThemePicker;
