import React, { PropTypes } from 'react';
import {
  MenuItem,
  SelectField,
} from 'material-ui';

const LanguageSelector = (props) => {
  const {
    language,
    onChange,
    style,
  } = props;

  return (
    <SelectField
      id="languageSelector"
      onChange={onChange}
      style={style}
      value={language}
    >
      <MenuItem value="python3" primaryText="Python 3"/>
      <MenuItem value="java" primaryText="Java" disabled/>
    </SelectField>
  );
}

LanguageSelector.propTypes = {
  language: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
}

export default LanguageSelector;
