import React from 'react'
import renderer from 'react-test-renderer';

import TokenInfoPanel from '../../src/components/TokenInfoPanel'

jest.mock('material-ui/Card')
jest.mock('material-ui/Tabs')

describe('<TokenInfoPanel />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <TokenInfoPanel />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
