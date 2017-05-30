import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import KeymapPicker from '../../src/components/menus/KeymapPicker';

const defaultProps = {
  onChange: jest.fn(),
};

describe('<KeyPicker />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  describe('snapshot tests', () => {
    it('matches default snapshot', () => {
      const wrapper = shallowWithContext(<KeymapPicker {...defaultProps} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
