import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LineSnippet from '../../src/components/LineSnippet';

describe('<LanguageSelector />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <LineSnippet
        lineNumber={1}
        value={'foo bar baz'}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
})
