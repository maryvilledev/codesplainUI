import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import OrgSelector from '../../src/components/OrgSelector';

const defaultProps = {
  onChange: jest.fn(),
  orgs: ['galactic-federation', 'international-counsel-of-ricks'],
};

describe('<OrgSelector />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <OrgSelector {...defaultProps} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
