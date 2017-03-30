import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ResetFiltersButton from '../../src/components/buttons/ResetFiltersButton';

describe('<ResetFiltersButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <ResetFiltersButton
        resetCallback={jest.fn()}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('prop: resetCallback', () => {
    it('is triggered when button is clicked', () => {
      const resetCallback = jest.fn();
      const wrapper = shallowWithContext(
        <ResetFiltersButton
          resetCallback={resetCallback}
        />
      );
      const button = wrapper.find('RaisedButton');
      button.simulate('touchTap');
      expect(resetCallback).toHaveBeenCalled();
    });
  });
});
