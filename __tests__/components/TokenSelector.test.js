import React from 'react'
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TokenSelector from '../../src/components/TokenSelector';

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

describe('<TokenSelector />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <MuiThemeProvider>
        <TokenSelector
          tokens={mockFilters}
          onChange={jest.fn()}
        />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
