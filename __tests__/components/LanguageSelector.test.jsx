import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LanguageSelector from '../../src/components/LanguageSelector';

const defaultMockProps = {
  disabled: false,
  language: 'python3',
  onChange: jest.fn(),
  style: {},
};

describe('<LanguageSelector />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  describe('snapshot tests', () => {
    it('matches snapshot when it is not disabled', () => {
      const wrapper = shallowWithContext(
        <LanguageSelector {...defaultMockProps} />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('matches snapshot when it is disabled', () => {
      const wrapper = shallowWithContext(
        <LanguageSelector
          {...defaultMockProps}
          disabled
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('prop: disabled', () => {
    it('is forwarded to SelectField', () => {
      const disabled = false;
      const wrapper = shallowWithContext(
        <LanguageSelector
          {...defaultMockProps}
          disabled={disabled}
        />,
      );
      const select = wrapper.find('SelectField');
      expect(select.prop('disabled')).toEqual(disabled);
    });
  });

  describe('prop: language', () => {
    it('is forwarded to SelectField\'s value prop', () => {
      const language = 'python';
      const wrapper = shallowWithContext(
        <LanguageSelector
          {...defaultMockProps}
          language={language}
        />,
      );
      const select = wrapper.find('SelectField');
      expect(select.prop('value')).toEqual(language);
    });
  });

  describe('prop: onChange', () => {
    it('is forwarded to SelectField', () => {
      const onChange = jest.fn();
      const wrapper = shallowWithContext(
        <LanguageSelector
          {...defaultMockProps}
          onChange={onChange}
        />,
      );
      const select = wrapper.find('SelectField');
      expect(select.prop('onChange')).toEqual(onChange);
    });
  });
});
