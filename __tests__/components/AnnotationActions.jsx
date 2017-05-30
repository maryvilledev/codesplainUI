import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AnnotationActions from '../../src/components/buttons/AnnotationActions';

const defaultProps = {
  getNextAnnotation: jest.fn(),
  getPreviousAnnotation: jest.fn(),
  hasNextAnnotation: false,
  hasPrevAnnotation: false,
  onClose: jest.fn(),
  onEdit: jest.fn(),
};

describe('<AnnotationPanel />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  describe('snapshots', () => {
    it('matches snapshot', () => {
      const wrapper = shallowWithContext(<AnnotationActions {...defaultProps} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
