import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { NotificationSnackbar, mapDispatchToProps } from '../../src/components/NotificationSnackbar';

const defaultProps = {
  displaying: false,
  notification: 'Grasssssss tastes baddd',
  onRequestClose: jest.fn(),
};

describe('<NotificationSnackbar />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  describe('snapshots', () => {
    it('matches when it is displayed', () => {
      const wrapper = shallowWithContext(
        <NotificationSnackbar
          {...defaultProps}
          displaying
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('matches when it is not displayed', () => {
      const wrapper = shallowWithContext(
        <NotificationSnackbar
          {...defaultProps}
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    describe('mapDispatchToProps', () => {
      it('matches snapshot', () => {
        expect(mapDispatchToProps).toMatchSnapshot();
      });
    });
  });
});
