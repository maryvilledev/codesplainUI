import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SaveMenu from '../../src/components/menus/SaveMenu';

describe('<SaveMenu />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <SaveMenu
        onSaveClick={jest.fn()}
        onSaveAsClick={jest.fn()}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('prop: onSaveAsClick', () => {
    it('forwarded to the "Save" MenuItem', () => {
      const onSaveClick = jest.fn();
      const wrapper = shallowWithContext(
        <SaveMenu
          onSaveClick={onSaveClick}
          onSaveAsClick={jest.fn()}
        />
      );
      expect(wrapper.find('[primaryText="Save"]').prop('onTouchTap')).toEqual(onSaveClick);
    });
  });

  describe('prop: onSaveAsClick', () => {
    const onSaveAsClick = jest.fn();
    const wrapper = shallowWithContext(
      <SaveMenu
        onSaveClick={jest.fn()}
        onSaveAsClick={onSaveAsClick}
      />
    );
    expect(wrapper.find('[primaryText="Save As"]').prop('onTouchTap')).toEqual(onSaveAsClick);
  });
});
