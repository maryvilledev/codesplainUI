import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SelectAllFiltersButton from '../../src/components/buttons/SelectAllFiltersButton';

describe('<SelectAllFiltersButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <SelectAllFiltersButton
        selectCallback={jest.fn()}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('prop: selectCallback', () => {
    it('is triggered when button is clicked', () => {
      const selectCallback = jest.fn();
      const wrapper = shallowWithContext(
        <SelectAllFiltersButton
          selectCallback={selectCallback}
        />
      );
      const button = wrapper.find('RaisedButton');
      button.simulate('touchTap');
      expect(selectCallback).toHaveBeenCalled();
    });
  });
});
