import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Alert from '../../src/components/Alert';

describe('<Alert />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <Alert
        onClose={jest.fn()}
        text="Wubba lubba dub dub!"
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('prop: onClose', () => {
    it('should forward it', () => {
      const onClose = jest.fn();
      const wrapper = shallowWithContext(
        <Alert
          onClose={onClose}
          text="Wubba lubba dub dub!"
        />
      );
      expect(wrapper.prop('onRequestClose')).toEqual(onClose);
    });
  });
});
