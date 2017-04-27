import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MarkdownDisplayer from '../../src/components/MarkdownDisplayer';

const defaultProps = {
  annotation: '',
};

describe('<MarkdownDisplayer />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  describe('snapshots', () => {
    describe('matches snapshot', () => {
      it('matches snapshot', () => {
        const wrapper =
          shallowWithContext(<MarkdownDisplayer {...defaultProps} />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });
    });
    describe('prop: annotation', () => {
      it('is forwarded to MarkdownRenderer', () => {
        const annotation = 'No jumping in the sewer!';
        const wrapper = shallowWithContext(
          <MarkdownDisplayer annotation={annotation} />,
        );
        const markdownRenderer = wrapper.find('MarkdownRenderer');
        expect(markdownRenderer.prop('markdown')).toEqual(annotation);
      });
    });
  });
});
