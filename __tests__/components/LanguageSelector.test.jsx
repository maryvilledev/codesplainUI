import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LanguageSelector from '../../src/components/LanguageSelector';

const defaultMockProps = {
  language: 'python',
  onChange: jest.fn(),
  style: {},
};

describe('<LanguageSelector />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <LanguageSelector {...defaultMockProps}/>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('prop: language', () => {
    it('is forwarded to SelectField\'s value prop', () => {
      const language = 'python';
      const wrapper = shallowWithContext(
        <LanguageSelector
          {...defaultMockProps}
          language={language}
        />
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
        />
      );
      const select = wrapper.find('SelectField');
      expect(select.prop('onChange')).toEqual(onChange);
    });
  });
});
