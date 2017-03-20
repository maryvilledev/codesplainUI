import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AnnotationDisplay from '../../src/components/AnnotationDisplay';

const mockFunctionProps = {
  closeAnnotation: jest.fn(),
  editAnnotation: jest.fn(),
};

describe('<AnnotationDisplay />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <AnnotationDisplay
        annotation={'some annotation'}
        {...mockFunctionProps}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('prop: annotation', () => {
    it('is rendered into a MarkdownRenderer', () => {
      const annotation = 'Wubba lubba dub dub!';
      const wrapper = shallowWithContext(
        <AnnotationDisplay
          annotation={annotation}
          {...mockFunctionProps}
        />
      );
      expect(wrapper.find('MarkdownRenderer').prop('markdown')).toEqual(annotation);
    });
  });
});
