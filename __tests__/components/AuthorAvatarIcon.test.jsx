import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AuthorAvatarIcon from '../../src/components/AuthorAvatarIcon';


describe('<AuthorAvatarIcon />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  it('matches snapshot when it is open', () => {
    const wrapper = shallowWithContext(
      <AuthorAvatarIcon
        avatarUrl="https://avatars2.githubusercontent.com/u/0?v=3"
        author="author"
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when no avatar url is provided', () => {
    const wrapper = shallowWithContext(
      <AuthorAvatarIcon
        avatarUrl=""
        author=""
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
