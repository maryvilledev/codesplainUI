import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Editor from '../../src/components/Editor';

const defaultProps = {
  AST: {},
  filters: {},
  language: 'python3',
  markedLines: [],
  onChange: jest.fn(),
  onGutterClick: jest.fn(),
  readOnly: false,
  value: '',
};

describe('<Editor />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <Editor {...defaultProps} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('prop: onChange', () => {
    it('forwarded to the CodeMirror instance', () => {
      const onChange = jest.fn();
      const wrapper = shallowWithContext(
        <Editor
          {...defaultProps}
          onChange={onChange}
        />
      );
      expect(wrapper.find('CodeMirror').prop('onChange')).toEqual(onChange);
    });
  });

  describe('prop: value', () => {
    it('forwarded to the CodeMirror instance', () => {
      const snippetContents = "What up, my glib globs!";
      const wrapper = shallowWithContext(
        <Editor
          {...defaultProps}
          value={snippetContents}
        />
      );
      expect(wrapper.find('CodeMirror').prop('value')).toEqual(snippetContents);
    });
  });
});
