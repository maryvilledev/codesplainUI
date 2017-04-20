import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LineSnippet from '../../src/components/LineSnippet';

describe('<LanguageSelector />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <LineSnippet
        lineNumber={1}
        value={'foo bar baz'}
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('prop: value', () => {
    it('is passed to the CodeMirror instance', () => {
      const annotation = 'Wubba lubba dub dub!';
      const wrapper = shallowWithContext(
        <LineSnippet
          lineNumber={1}
          value={annotation}
        />,
      );
      expect(wrapper.find('CodeMirror').prop('value')).toEqual(annotation);
    });
  });
  describe('prop: lineNumber', () => {
    it('is passed to the firstLineNumber option', () => {
      const lineNumber = 0;
      const annotation = 'Wubba lubba dub dub!';
      const wrapper = shallowWithContext(
        <LineSnippet
          lineNumber={lineNumber}
          value={annotation}
        />,
      );
      expect(wrapper.find('CodeMirror').prop('options').firstLineNumber).toEqual(lineNumber);
    });
  });
});
