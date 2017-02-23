import React, { PropTypes } from 'react';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

const LanguageSelector = ({ languages, onChange, selected }) => {
  const languageMenuItems = languages.map((lang, index) => {
    return (
      <MenuItem
        key={`${lang.value}-index`}
        primaryText={lang.text}
        value={lang.value}
      />
    );
  })
  return (
    <SelectField
      floatingLabelText="Language"
      onChange={onChange}
      value={selected}
    >
      <MenuItem value={null} primaryText="" />
      {languageMenuItems}
    </SelectField>
  );
};

LanguageSelector.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
};

export default LanguageSelector;
