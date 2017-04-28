import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Annotations, mapDispatchToProps } from '../../src/containers/Annotations';

const defaultProps = {
  annotation: '',
  annotations: {},
  displayAnnotationPanel: jest.fn(),
  hideAnnotationPanel: jest.fn(),
  isDisplayingAnnotation: false,
  lineAnnotated: {},
  readOnly: false,
  saveAnnotationToState: jest.fn(),
  saveExistingSnippet: jest.fn(),
  snippetKey: '',
};

const muiTheme = getMuiTheme();
const shallowWithContext = node => shallow(node, { context: { muiTheme } });

const setup = (props = {}) => (
  shallowWithContext(<Annotations {...defaultProps} {...props} />)
);

describe('<Annotations />', () => {
  describe('snapshots', () => {
    it('matches when snippet is not locked', () => {
      const wrapper = setup();
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('matches when snippet is locked and no annotation is displayed', () => {
      const wrapper = setup({ readOnly: true });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('matches when snippet is locked and an annotation is displayed', () => {
      const props = {
        annotation: 'annotation',
        isDisplayingAnnotation: true,
        lineAnnotated: { lineNumber: 1, lineText: 'line of code' },
        readOnly: true,
      };
      const wrapper = setup(props);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('mapDispatchToProps', () => {
    it('matches snapshot', () => {
      expect(mapDispatchToProps).toMatchSnapshot();
    });
  });
});
