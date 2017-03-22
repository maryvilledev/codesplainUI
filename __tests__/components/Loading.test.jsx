import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Loading from '../../src/components/Loading';

describe('<Loading />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <Loading />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('prop: text', () => {
    it('renders the text', () => {
      const text = "Wubba lubba dub dub!";
      const wrapper = shallowWithContext(
        <Loading text={text} />
      );
      expect(wrapper.find('p').text()).toEqual(text);
    });
  });
});
