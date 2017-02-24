import React from 'react'
import renderer from 'react-test-renderer';

import SnippetArea from '../../src/components/SnippetArea'

jest.mock('material-ui/TextField')
jest.mock('material-ui/Card')

const mockContents = ":(){ :|: & };:"
const mockSnippetLanguage = "bash"

describe('<SnippetArea />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <SnippetArea
        contents={mockContents}
        snippetLanguage={mockSnippetLanguage}
        onSnippetChanged={jest.fn()}
        onTitleChanged={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
