import React from 'react'
import ReactTestUtils from 'react-addons-test-utils';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SnippetArea from '../../src/components/SnippetArea'

jest.mock('react-codemirror')

const mockContents = ":(){ :|: & };:"
const mockSnippetLanguage = "bash"

const mockProps = {
  onGutterClick: jest.fn(),
  onSaveClick: jest.fn(),
  onSnippetChanged: jest.fn(),
  onTitleChanged: jest.fn(),
  switchReadOnlyMode: jest.fn(),
};

describe('<SnippetArea />', () => {
  it('matches snapshot of when it is not read-only', () => {
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
          onParserRun={jest.fn()}
          readOnly={false}
          snippetLanguage={mockSnippetLanguage}
          title={''}
          {...mockProps}
        />
      </MuiThemeProvider>
    );
    expect(tree).toMatchSnapshot();
  });
  it('matches snapshot of when it is read-only', () => {
    const renderer = ReactTestUtils.createRenderer();
    const tree = renderer.render(
      <MuiThemeProvider>
        <SnippetArea
          annotatedLines={["1", "2", "3"]}
          contents={''}
          readOnly={true}
          snippetLanguage={mockSnippetLanguage}
          onParserRun={jest.fn()}
          title={''}
          {...mockProps}
        />
      </MuiThemeProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});
