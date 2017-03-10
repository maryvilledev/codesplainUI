import React from 'react'
import { shallow, mount, render } from 'enzyme'

import { FilterArea } from '../../src/containers/FilterArea'

let mockOnRuleSelected;
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

//Mock to simply render children
jest.mock('material-ui', () => ({
  CardText: ({children}) => children
}))
//Mock to allow me to arbitrarily toggle
jest.mock('../../src/components/RulesSelector', () => {
  return jest.fn(({onRuleSelected}) => {
    mockOnRuleSelected = onRuleSelected
    return null
  })
})

describe('<FilterArea />', () => {
  const filterToToggle = 'rick';
  const filterNotToToggle = 'morty'
  it('toggles a filter when handleSaveAnnotation is called', () => {
    const wrapper = mount(
      <FilterArea
        filters={mockFilters}
        dispatch={mockDispatch}
      />
    )
    mockOnRuleSelected(filterToToggle)
    const { payload } = mockDispatch.mock.calls[0][0];
    expect(payload[filterToToggle].selected).toBe(true);
    expect(payload[filterNotToToggle].selected).toBe(false);
  });
});
