import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SaveMenu from '../../src/components/menus/SaveMenu';

const defaultProps = {
  canSave: true,
  enabled: true,
  onSaveClick: jest.fn(),
  onSaveAsClick: jest.fn(),
};

describe('<SaveMenu />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });
  describe('snapshot tests', () => {
    it('matches default snapshot', () => {
      const wrapper = shallowWithContext(
        <SaveMenu
          {...defaultProps}
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('matches snapshot when saving is not enabled', () => {
      const wrapper = shallowWithContext(
        <SaveMenu
          {...defaultProps}
          enabled={false}
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('matches snapshot when user cannot save', () => {
      const wrapper = shallowWithContext(
        <SaveMenu
          {...defaultProps}
          canSave={false}
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('prop: onSaveClick', () => {
    it('is is invoked when the "Save" MenuItem is clicked', () => {
      const onSaveClick = jest.fn();
      const wrapper = shallowWithContext(
        <SaveMenu
          {...defaultProps}
          onSaveClick={onSaveClick}
        />,
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
        <SaveMenu {...defaultProps} />,
      );
      wrapper.find('TextField').simulate('change', {}, 'testing');
      expect(wrapper.instance().state.saveAsName).toBe('testing');
    });
    it('has a "Save" button that invokes the "onSaveAsClick" prop with the ' +
       'value of the "saveAsName" state field when clicked', () => {
      const onSaveAsClick = jest.fn();
      const wrapper = shallowWithContext(
        <SaveMenu
          {...defaultProps}
          onSaveAsClick={onSaveAsClick}
        />,
      );
      const title = 'test title';
      wrapper.instance().setState({ saveAsName: title });
      const dialogButtons = shallowWithContext(wrapper.find('Dialog').prop('actions'));
      dialogButtons.find('[label="Save"]').simulate('touchTap');
      expect(onSaveAsClick.mock.calls[0][0]).toBe(title);
    });
    it('has a "Cancel" button that does NOT invoke the "onSaveAsClick" prop ' +
       'when clicked', () => {
      const onSaveAsClick = jest.fn();
      const wrapper = shallowWithContext(
        <SaveMenu
          {...defaultProps}
          onSaveAsClick={onSaveAsClick}
        />,
      );
      const dialogButtons = shallowWithContext(wrapper.find('Dialog').prop('actions'));
      dialogButtons.find('[label="Cancel"]').simulate('touchTap');
      expect(onSaveAsClick.mock.calls.length).toBe(0);
    });
  });
});
