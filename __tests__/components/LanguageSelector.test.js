import React from 'react'
import renderer from 'react-test-renderer';

import LanguageSelector from '../../src/components/LanguageSelector'

jest.mock('material-ui/MenuItem')
jest.mock('material-ui/SelectField')

const mockLanguages = [
  {text: "French", value: 'fr'},
  {text: "Japanese", value: 'jp'}
]

describe('<LanguageSelector />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <LanguageSelector
        languages={mockLanguages}
        onChange={jest.fn()}
        selected={mockLanguages[0].value}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
