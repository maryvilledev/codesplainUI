import React from 'react'
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TokenSelector from '../../src/components/TokenSelector';

jest.mock('material-ui/Checkbox')

const mockTokenTypes = [
  {text: "for-each"},
  {text: "for-in"},
  {text: "for-of"}
]

describe('<TokenSelector />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <MuiThemeProvider>
        <TokenSelector
          tokenTypes={mockTokenTypes}
          onChange={jest.fn()}
        />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
