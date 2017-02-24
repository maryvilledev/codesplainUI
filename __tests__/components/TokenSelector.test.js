import React from 'react'
import renderer from 'react-test-renderer';

import TokenSelector from '../../src/components/TokenSelector'

jest.mock('material-ui/List')
jest.mock('material-ui/Subheader')
jest.mock('material-ui/Checkbox')

const mockTokenTypes = [
  {text: "for-each"},
  {text: "for-in"},
  {text: "for-of"}
]

describe('<TokenSelector />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <TokenSelector
        tokenTypes={mockTokenTypes}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
