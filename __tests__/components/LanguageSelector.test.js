import React from 'react'
import ReactTestUtils from 'react-addons-test-utils';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LanguageSelector from '../../src/components/LanguageSelector'

const mockLanguages = [
  {text: "French", value: 'fr'},
  {text: "Japanese", value: 'jp'}
]

describe('<LanguageSelector />', () => {
  it('matches snapshot', () => {
    const renderer = ReactTestUtils.createRenderer();
    const tree = renderer.render(
      <MuiThemeProvider>
        <LanguageSelector
          languages={mockLanguages}
          onChange={jest.fn()}
          selected={mockLanguages[0].value}
        />
      </MuiThemeProvider>
    );
    expect(tree).toMatchSnapshot();
  })
})
