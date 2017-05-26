import React, { PropTypes } from 'react';
import {
  MenuItem,
} from 'material-ui';
import memoize from 'lodash/memoize';
import PaletteIcon from 'material-ui/svg-icons/image/palette';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import codeMirrorThemeOptions from '../../util/codemirror-theme-options';

const DEFAULT_THEME = <MenuItem primaryText="Codesplain" value="codesplain" />;

const makeThemePickerItems = memoize((selected, onChange) => (
  [DEFAULT_THEME]
    .concat(
      codeMirrorThemeOptions.map(([displayName, value]) => (
        <MenuItem
          checked={value === selected}
          key={value}
          primaryText={displayName}
          value={value}
          onTouchTap={() => { onChange(value); }}
        />
    )),
  )
));

const ThemePicker = (props) => {
  const { codeMirrorTheme, onChange } = props;
  return (
    <MenuItem
      leftIcon={<PaletteIcon />}
      rightIcon={<ArrowDropRight />}
      primaryText="Theme"
      onChange={onChange}
      menuItems={makeThemePickerItems(codeMirrorTheme, onChange)}
    />
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
