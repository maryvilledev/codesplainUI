import React from 'react'
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LanguageSelector from '../../src/components/LanguageSelector'

const mockLanguages = [
  {text: "French", value: 'fr'},
  {text: "Japanese", value: 'jp'}
]

describe('<LanguageSelector />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <MuiThemeProvider>
        <LanguageSelector
          languages={mockLanguages}
          onChange={jest.fn()}
          selected={mockLanguages[0].value}
        />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
