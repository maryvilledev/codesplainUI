import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RulesSelector from '../../src/components/RulesSelector';

jest.mock('material-ui/Checkbox')

const mockFilters = {
  'for_stmt': {
    prettyTokenName: 'For Loops',
    count: 1,
    selected: false
  },
  'atom': {
    prettyTokenName: 'Atoms',
    count: 21,
    selected: true
  }
}

describe('<RulesSelector />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <RulesSelector
        filters={mockFilters}
        onRuleSelected={jest.fn()}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('prop: filters', () => {
    it('renders ListItems for each filter', () => {
      const wrapper = shallowWithContext(
        <RulesSelector
          filters={mockFilters}
          onRuleSelected={jest.fn()}
        />
      );
      const listItems = wrapper.find('ListItem');
      expect(listItems.length).toEqual(Object.keys(mockFilters).length);
    });
  });
});
