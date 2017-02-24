import React from 'react'
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SnippetArea from '../../src/components/SnippetArea'

jest.mock('react-codemirror')

const mockContents = ":(){ :|: & };:"
const mockSnippetLanguage = "bash"

describe('<SnippetArea />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <MuiThemeProvider>
        <SnippetArea
          contents={mockContents}
          snippetLanguage={mockSnippetLanguage}
          onSnippetChanged={jest.fn()}
          onTitleChanged={jest.fn()}
        />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
