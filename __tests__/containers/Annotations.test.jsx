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
  afterEach(() => {
    const {
      displayAnnotationPanel,
      hideAnnotationPanel,
      saveAnnotationToState,
      saveExistingSnippet,
    } = defaultProps;
    displayAnnotationPanel.mockClear();
    hideAnnotationPanel.mockClear();
    saveAnnotationToState.mockClear();
    saveExistingSnippet.mockClear();
  });

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

  describe('getNextAnnotation', () => {
    const props = {
      annotation: 'spam',
      annotations: {
        1: { annotation: 'spam', lineNumber: 1, lineText: 'foo' },
        2: { annotation: 'eggs', lineNumber: 2, lineText: 'bar' },
        3: { annotation: 'bacon', lineNumber: 3, lineText: 'baz' },
      },
      isDisplayingAnnotation: true,
      lineAnnotated: {
        lineNumber: 1,
        lineText: 'foo',
      },
    };
    it('gets the next annotation if there is one', () => {
      const expected = {
        lineNumber: 2,
        lineText: 'bar',
      };
      const wrapper = setup(props);
      wrapper.instance().getNextAnnotation();
      const dispatchedArgs = defaultProps.displayAnnotationPanel.mock.calls[0][0];
      expect(dispatchedArgs).toEqual(expected);
    });
    it('does nothing if there is no proceeding annotation', () => {
      const wrapper = setup({
        ...props,
        lineAnnotated: {
          lineNumber: 3,
          lineText: 'baz',
        },
      });
      wrapper.instance().getNextAnnotation();
      const dispatchedArgs = defaultProps.displayAnnotationPanel.mock.calls[0];
      expect(dispatchedArgs).not.toBeDefined();
    });
  });

  describe('getPreviousAnnotation', () => {
    const props = {
      annotation: 'spam',
      annotations: {
        1: { annotation: 'spam', lineNumber: 1, lineText: 'foo' },
        2: { annotation: 'eggs', lineNumber: 2, lineText: 'bar' },
        3: { annotation: 'bacon', lineNumber: 3, lineText: 'baz' },
      },
      isDisplayingAnnotation: true,
      lineAnnotated: {
        lineNumber: 2,
        lineText: 'bar',
      },
    };
    it('gets the next annotation if there is one', () => {
      const expected = {
        lineNumber: 1,
        lineText: 'foo',
      };
      const wrapper = setup(props);
      wrapper.instance().getPreviousAnnotation();
      const dispatchedArgs = defaultProps.displayAnnotationPanel.mock.calls[0][0];
      expect(dispatchedArgs).toEqual(expected);
    });
    it('does nothing if there is no proceeding annotation', () => {
      const wrapper = setup({
        ...props,
        lineAnnotated: {
          lineNumber: 1,
          lineText: 'foo',
        },
      });
      wrapper.instance().getPreviousAnnotation();
      const dispatchedArgs = defaultProps.displayAnnotationPanel.mock.calls[0];
      expect(dispatchedArgs).not.toBeDefined();
    });
  });

  describe('handleSaveAnnotation', () => {
    const annotation = 'annotation';
    const expectedSaveAnnotation = { annotation };
    it('does not call saveExistingSnippet if snippetKey isn\'t present', () => {
      const wrapper = setup();
      wrapper.instance().handleSaveAnnotation(annotation);
      const dispatchedArgs = defaultProps.saveAnnotationToState.mock.calls[0];
      expect(dispatchedArgs[0]).toEqual(expectedSaveAnnotation);
      expect(defaultProps.saveExistingSnippet.mock.calls[0]).not.toBeDefined();
    });
    it('does not call saveExistingSnippet if snippetKey isn\'t present', () => {
      const wrapper = setup({ snippetKey: 'key' });
      wrapper.instance().handleSaveAnnotation('annotation');
      expect(defaultProps.saveAnnotationToState.mock.calls[0][0]).toEqual(expectedSaveAnnotation);
      expect(defaultProps.saveExistingSnippet.mock.calls[0]).toBeDefined();
    });
  });
});
