import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AnnotationDisplay from '../../src/components/AnnotationDisplay';

const defaultProps = {
  annotation: '',
  closeAnnotation: jest.fn(),
  editAnnotation: jest.fn(),
  getNextAnnotation: jest.fn(),
  getPreviousAnnotation: jest.fn(),
  hasNextAnnotation: false,
  hasPrevAnnotation: false,
};

describe('<AnnotationDisplay />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  describe('snapshots', () => {
    describe('when no annotations before/after current one exist', () => {
      it('matches snapshot', () => {
        const wrapper = shallowWithContext(<AnnotationDisplay {...defaultProps} />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });
    });
    describe('when an annotation after current one exists', () => {
      it('matches snapshot', () => {
        const wrapper = shallowWithContext(
          <AnnotationDisplay
            {...defaultProps}
            hasNextAnnotation
          />,
        );
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });
    });
    describe('when an annotation before current one exists', () => {
      it('matches snapshot', () => {
        const wrapper = shallowWithContext(
          <AnnotationDisplay
            {...defaultProps}
            hasPrevAnnotation
          />,
         );
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });
    });
    describe('when annotation exists before/after current one', () => {
      it('matches snapshot', () => {
        const wrapper = shallowWithContext(
          <AnnotationDisplay
            {...defaultProps}
            hasNextAnnotation
            hasPrevAnnotation
          />,
         );
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });
    });
  });

  describe('prop: annotation', () => {
    it('is rendered into a MarkdownRenderer', () => {
      const annotation = 'Wubba lubba dub dub!';
      const wrapper = shallowWithContext(
        <AnnotationDisplay
          {...defaultProps}
          annotation={annotation}
        />,
      );
      expect(wrapper.find('MarkdownRenderer').prop('markdown')).toEqual(annotation);
    });
  });
});
