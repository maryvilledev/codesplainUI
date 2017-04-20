import React, { PropTypes } from 'react';
import {
  MenuItem,
  SelectField,
} from 'material-ui';

const LanguageSelector = (props) => {
  const {
    disabled,
    language,
    onChange,
    style,
  } = props;

  return (
    <SelectField
      disabled={disabled}
      id="languageSelector"
      onChange={onChange}
      style={style}
      value={language}
    >
      <MenuItem value="python3" primaryText="Python 3" />
      <MenuItem value="java" primaryText="Java" disabled />
    </SelectField>
  );
};

LanguageSelector.propTypes = {
  disabled: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LanguageSelector;
