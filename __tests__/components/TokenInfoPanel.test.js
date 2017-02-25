import React from 'react'
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TokenInfoPanel from '../../src/components/TokenInfoPanel';

describe('<TokenInfoPanel />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <MuiThemeProvider>
        <TokenInfoPanel />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
