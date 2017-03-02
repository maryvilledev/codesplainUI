import React from 'react'
import ReactTestUtils from 'react-addons-test-utils';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LineSnippet from '../../src/components/LineSnippet';

describe('<LanguageSelector />', () => {
  it('matches snapshot', () => {
    const renderer = ReactTestUtils.createRenderer();
    const tree = renderer.render(
      <MuiThemeProvider>
        <LineSnippet
          lineNumber={1}
          value={'foo bar baz'}
        />
      </MuiThemeProvider>
    );
    expect(tree).toMatchSnapshot();
  })
})
