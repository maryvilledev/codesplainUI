import React from 'react'
import { shallow, mount, render } from 'enzyme'

import { FilterArea } from '../../src/containers/FilterArea'

jest.mock('material-ui', () => ({
  CardText: ({children}) => children
}))
jest.mock('../../src/components/RulesSelector', () => {
  return jest.fn(({onRuleSelected}) => {
    onRuleSelected('rick');
    return null
  })
})

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
  it('toggles a filter when clicked', () => {
    jest.mock('material-ui', () => ({
      CardText: ({children}) => children
    }))
    jest.mock('../../src/components/RulesSelector', () => {
      return jest.fn(({onRuleSelected}) => {
        onRuleSelected('rick');
        return null
      })
    })
    const wrapper = mount(
      <FilterArea
        filters={mockFilters}
        dispatch={mockDispatch}
      />
    )
    const { payload } = mockDispatch.mock.calls[0][0];
    expect(payload['rick'].selected).toBe(true);
    expect(payload['morty'].selected).toBe(false);
  });
});
