import React from 'react';
import {
  mount,
  render,
  shallow,
} from 'enzyme';

import { FilterArea } from '../../src/containers/FilterArea';

const mockFilters = {
  rick: {
    selected: false,
    prettyTokenName: 'Rick Sanchez',
  },
  morty: {
    selected: false,
    prettyTokenName: 'Morty Smith',
  },
};
const mockDispatch = jest.fn();

describe('<FilterArea />', () => {
  beforeEach(() => {
    mockDispatch.mockReset();
  });
  const wrapper = shallow(
    <FilterArea
      filters={mockFilters}
      dispatch={mockDispatch}
    />
  )
  it('toggles a filter on handleRuleSelected', () => {
    const filter = 'rick';
    wrapper.instance().handleRuleSelected(filter)
    const { payload } = mockDispatch.mock.calls[0][0];
    expect(payload[filter]).toEqual(expect.objectContaining({selected: true}));
  });
});
