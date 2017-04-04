import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MenuItem from 'material-ui';

import SaveMenu from '../../src/components/menus/SaveMenu';

describe('<SaveMenu />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <SaveMenu
        onSaveClick={jest.fn()}
        onSaveAsClick={jest.fn()}
        canSave={true}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('prop: onSaveClick', () => {
    it('is is invoked when the "Save" MenuItem is clicked', () => {
      const onSaveClick = jest.fn();
      const wrapper = shallowWithContext(
        <SaveMenu
          onSaveClick={onSaveClick}
          onSaveAsClick={jest.fn()}
          canSave={true}
        />
      );

      // Have to use 'touchTap' as opposed to 'click' here, see
      // "Common Gotchas" section of http://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html
      wrapper.find('[primaryText="Save"]').simulate('touchTap');
      expect(onSaveClick.mock.calls.length).toBe(1);
    });
  });

  describe('the Save As dialog', () => {
    it('has a <TextField /> that updates the state when edited', () => {
      const wrapper = shallowWithContext(
        <SaveMenu
          onSaveClick={jest.fn()}
          onSaveAsClick={jest.fn()}
          canSave={true}
        />
      )
      wrapper.find('TextField').simulate('change', {}, 'testing');
      expect(wrapper.instance().state.saveAsName).toBe('testing');
    });
    it('has a "Save" button that invokes the "onSaveAsClick" prop with the ' +
       'value of the "saveAsName" state field when clicked', () => {
      const onSaveAsClick = jest.fn();
      const wrapper = shallowWithContext(
        <SaveMenu
          onSaveClick={jest.fn()}
          onSaveAsClick={onSaveAsClick}
          canSave={true}
        />
      );
      const title = 'test title';
      wrapper.instance().setState({ saveAsName: title });
      const dialogButtons = shallowWithContext(wrapper.find('Dialog').prop('actions'))
      dialogButtons.find('[label="Save"]').simulate('touchTap');
      expect(onSaveAsClick.mock.calls[0][0]).toBe(title);
    });
    it('has a "Cancel" button that does NOT invoke the "onSaveAsClick" prop ' +
       'when clicked', () => {
      const onSaveAsClick = jest.fn();
      const wrapper = shallowWithContext(
        <SaveMenu
          onSaveClick={jest.fn()}
          onSaveAsClick={onSaveAsClick}
          canSave={true}
        />
      );
      const dialogButtons = shallowWithContext(wrapper.find('Dialog').prop('actions'))
      dialogButtons.find('[label="Cancel"]').simulate('touchTap');
      expect(onSaveAsClick.mock.calls.length).toBe(0);
    });
  });
});
