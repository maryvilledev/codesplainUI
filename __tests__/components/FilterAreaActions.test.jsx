import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import FilterAreaActions from '../../src/components/FilterAreaActions';

describe('<FilterAreaActions />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  it('matches snapshot of when the app is not in read-only mode', () => {
    const wrapper = shallowWithContext(
      <FilterAreaActions
        clearAll={jest.fn()}
        selectAll={jest.fn()}
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('prop: clearAll', () => {
    it('is triggered when "Clear All" button is clicked', () => {
      const clearAll = jest.fn();
      const wrapper = shallowWithContext(
        <FilterAreaActions
          clearAll={clearAll}
          selectAll={jest.fn()}
        />,
      );
      const button = wrapper.find('FlatButton[label="Clear All"]');
      button.simulate('touchTap');
      expect(clearAll).toHaveBeenCalled();
    });
  });
  describe('prop: selectAll', () => {
    it('is triggered when "Select All" button is clicked', () => {
      const selectAll = jest.fn();
      const wrapper = shallowWithContext(
        <FilterAreaActions
          clearAll={jest.fn()}
          selectAll={selectAll}
        />,
      );
      const button = wrapper.find('FlatButton[label="Select All"]');
      button.simulate('touchTap');
      expect(selectAll).toHaveBeenCalled();
    });
  });
});
