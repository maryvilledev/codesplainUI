import React from 'react'
import ReactTestUtils from 'react-addons-test-utils';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SnippetArea from '../../src/components/SnippetArea'

jest.mock('react-codemirror')

const mockContents = ":(){ :|: & };:"
const mockSnippetLanguage = "bash"

describe('<SnippetArea />', () => {
  it('matches snapshot', () => {
    const renderer = ReactTestUtils.createRenderer();
    const tree = renderer.render(
      <MuiThemeProvider>
        <SnippetArea
          annotatedLines={["1", "2", "3"]}
          contents={''}
          onGutterClick={jest.fn()}
          onSaveClick={jest.fn()}
          onSnippetChanged={jest.fn()}
          onTitleChanged={jest.fn()}
          readOnly={false}
          snippetLanguage={mockSnippetLanguage}
          switchReadOnlyMode={jest.fn()}
          title={''}
        />
      </MuiThemeProvider>
    );
    expect(tree).toMatchSnapshot();
  })
})
