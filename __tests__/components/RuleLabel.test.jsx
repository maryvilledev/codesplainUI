import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RuleLabel from '../../src/components/RuleLabel';

describe('<RuleLabel />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <RuleLabel 
        color=""
        text=""
        onClick={jest.fn()}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('displays the text prop', () => {
    const text = 'Test Text';
    const wrapper = shallowWithContext(
      <RuleLabel 
        color=""
        text={text}
        onClick={jest.fn()}
      />
    );
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.children().node).toBe(text);
  });
  it('toggles color when clicked', () => {
    const color = '#000000';
    const wrapper = shallowWithContext(
      <RuleLabel 
        color={color}
        text={''}
        onClick={jest.fn()}
      />
    );
    expect(wrapper.props().style.backgroundColor).toBe('transparent');
    wrapper.simulate('click');
    expect(wrapper.props().style.backgroundColor).toBe(color);
    wrapper.simulate('click');
    expect(wrapper.props().style.backgroundColor).toBe('transparent');
  });
  it('invokes the onClick callback prop', () => {
    const onClick = jest.fn();
    const wrapper = shallowWithContext(
      <RuleLabel 
        color={''}
        text={''}
        onClick={onClick}
      />
    );
    wrapper.simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });
});
