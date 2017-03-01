 import React from 'react'
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CodesplainAppBar from '../../src/components/CodesplainAppBar'

describe('<CodesplainAppBar />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <MuiThemeProvider>
        <CodesplainAppBar />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
