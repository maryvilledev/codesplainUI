import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AnnotationPaginator from '../../src/components/buttons/AnnotationPaginator';

const defaultProps = {
  getNextAnnotation: jest.fn(),
  getPreviousAnnotation: jest.fn(),
  hasNextAnnotation: false,
  hasPrevAnnotation: false,
};

describe('<AnnotationPanel />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  describe('snapshots', () => {
    it('matches snapshot', () => {
      const wrapper = shallowWithContext(<AnnotationPaginator {...defaultProps} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
