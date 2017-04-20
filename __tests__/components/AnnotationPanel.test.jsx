import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AnnotationPanel from '../../src/components/AnnotationPanel';

const mockFunctionProps = {
  closeAnnotation: jest.fn(),
  getNextAnnotation: jest.fn(),
  getPreviousAnnotation: jest.fn(),
  saveAnnotation: jest.fn(),
};
const defaultProps = {
  ...mockFunctionProps,
  annotation: '',
  lineAnnotated: {
    lineNumber: 0,
    lineText: 'You don\'t know me!',
  },
  hasNextAnnotation: false,
  hasPrevAnnotation: false,
};

describe('<AnnotationPanel />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  describe('snapshot tests', () => {
    it('matches snapshot when no annotation is saved for a line', () => {
      const wrapper = shallowWithContext(
        <AnnotationPanel
          {...defaultProps}
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('matches snapshot when an annotation is saved for a line', () => {
      const wrapper = shallowWithContext(
        <AnnotationPanel
          {...defaultProps}
          annotation="Wubba lubba dub dub!"
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('prop: lineAnnotated', () => {
    it('is forwarded to LineSnippet', () => {
      const lineAnnotated = {
        lineNumber: 0,
        lineText: 'You pass butter',
      };
      const wrapper = shallowWithContext(
        <AnnotationPanel
          {...defaultProps}
          annotation="some annotation"
          lineAnnotated={lineAnnotated}
        />,
      );
      const lineSnippet = wrapper.find('LineSnippet');
      expect(lineSnippet.prop('lineNumber')).toEqual(Number(lineAnnotated.lineNumber) + 1);
      expect(lineSnippet.prop('value')).toEqual(lineAnnotated.lineText);
    });
  });
});
