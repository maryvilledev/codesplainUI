import React from 'react'
import { shallow, mount, render } from 'enzyme'

import { FilterArea } from '../../src/containers/FilterArea'

const mockFilters = {
  rick: {
    selected: false,
    prettyTokenName: 'Rick Sanchez'
  },
  morty: {
    selected: false,
    prettyTokenName: 'Morty Smith'
  }
}
const mockDispatch = jest.fn()

describe('<FilterArea />', () => {
  const filterToToggle = 'rick';
  const filterNotToToggle = 'morty'
  it('toggles a filter when handleRuleSelected is called', () => {
    const wrapper = shallow(
      <FilterArea
        filters={mockFilters}
        dispatch={mockDispatch}
      />
    )
    wrapper.instance().handleRuleSelected(filterToToggle)
    const { payload } = mockDispatch.mock.calls[0][0];
    expect(payload[filterToToggle].selected).toBe(true);
    expect(payload[filterNotToToggle].selected).toBe(false);
  });
});
