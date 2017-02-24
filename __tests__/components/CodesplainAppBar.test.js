import React from 'react'
import renderer from 'react-test-renderer';

import CodesplainAppBar from '../../src/components/CodesplainAppBar'

jest.mock('material-ui/AppBar')

describe('<CodesplainAppBar />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <CodesplainAppBar />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
