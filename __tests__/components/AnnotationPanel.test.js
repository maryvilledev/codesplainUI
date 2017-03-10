import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AnnotationPanel from '../../src/components/AnnotationPanel';

const mockFunctionProps = {
  closeAnnotation: jest.fn(),
  saveAnnotation: jest.fn(),
};

describe('<AnnotationPanel />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  describe('snapshot tests', () => {
    it('matches snapshot when no annotation is saved for a line', () => {
      const wrapper = shallowWithContext(
        <AnnotationPanel
          annotation=''
          snippetInformation={{
            lineNumber: 0,
            lineText: 'True',
          }}
          {...mockFunctionProps}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('matches snapshot when an annotation is saved for a line', () => {
      const wrapper = shallowWithContext(
        <AnnotationPanel
          annotation='Wubba lubba dub dub!'
          snippetInformation={{
            lineNumber: 0,
            lineText: 'True',
          }}
          {...mockFunctionProps}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('prop: snippetInformation', () => {
    it('is forwarded to LineSnippet', () => {
      const lineInfo = {
        lineNumber: 0,
        lineText: 'You pass butter',
      };
      const wrapper = shallowWithContext(
        <AnnotationPanel
          annotation='some annotation'
          snippetInformation={lineInfo}
          {...mockFunctionProps}
        />
      );
      const lineSnippet = wrapper.find('LineSnippet');
      expect(lineSnippet.prop('lineNumber')).toEqual(Number(lineInfo['lineNumber']) + 1);
      expect(lineSnippet.prop('value')).toEqual(lineInfo['lineText']);
    });
  });
});
