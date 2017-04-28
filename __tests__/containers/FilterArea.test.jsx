import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { FilterArea, mapDispatchToProps } from '../../src/containers/FilterArea';

const defaultProps = {
  dispatchSelectAllFilters: jest.fn(),
  filters: {
    rick: {
      selected: false,
      prettyTokenName: 'Rick Sanchez',
    },
    morty: {
      selected: false,
      prettyTokenName: 'Morty Smith',
    },
  },
  resetAllFilters: jest.fn(),
  setRuleFiltersState: jest.fn(),
};

const muiTheme = getMuiTheme();
const shallowWithContext = node => shallow(node, { context: { muiTheme } });

const setup = (props = {}) => (
  shallowWithContext(<FilterArea {...defaultProps} {...props} />)
);

describe('<FilterArea />', () => {
  describe('snapshots', () => {
    it('matches when there are no filters', () => {
      const wrapper = setup({ filters: {} });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('matches when there are filters', () => {
      const wrapper = setup();
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    describe('mapDispatchToProps', () => {
      it('matches snapshot', () => {
        expect(mapDispatchToProps).toMatchSnapshot();
      });
    });
  });
  it('toggles a filter on handleRuleSelected', () => {
    const selectedFilter = 'rick';
    const preselectedFilters = { ...defaultProps.filters };
    const expected = {
      ...preselectedFilters,
      [selectedFilter]: {
        ...preselectedFilters[selectedFilter],
        selected: true,
      },
    };
    const wrapper = setup();
    wrapper.instance().handleRuleSelected(selectedFilter);
    const dispatchedArgs = defaultProps.setRuleFiltersState.mock.calls[0][0];
    expect(dispatchedArgs).toEqual(expected);
    expect(dispatchedArgs).not.toEqual(preselectedFilters);
  });
});
