import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import CodesplainAppBar from '../../src/components/CodesplainAppBar';

describe('<CodesplainAppBar />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <CodesplainAppBar />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
