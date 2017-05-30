import React, { PropTypes } from 'react';
import memoize from 'lodash/memoize';
import { MenuItem } from 'material-ui';
import PaletteIcon from 'material-ui/svg-icons/image/palette';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import codeMirrorThemeOptions from '../../util/codemirror-theme-options';

const DEFAULT_THEME = <MenuItem primaryText="Codesplain" value="codesplain" />;

const makeThemePickerItems = memoize((selected, onChange) => (
  [DEFAULT_THEME].concat(
      codeMirrorThemeOptions.map(([displayName, value]) => (
        <MenuItem
          checked={value === selected}
          key={value}
          onTouchTap={() => { onChange(value); }}
          primaryText={displayName}
          value={value}
        />
    )),
  )
));

const ThemePicker = (props) => {
  const { codeMirrorTheme, onChange } = props;
  return (
    <MenuItem
      leftIcon={<PaletteIcon />}
      menuItems={makeThemePickerItems(codeMirrorTheme, onChange)}
      onChange={onChange}
      primaryText="Theme"
      rightIcon={<ArrowDropRight />}
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
