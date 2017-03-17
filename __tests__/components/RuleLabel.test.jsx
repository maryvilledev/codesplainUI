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
        rule=""
        count=""
        isActive={false}
        onClick={jest.fn()}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('displays the rule and count props', () => {
    const rule = 'Test Rule';
    const count = '1';
    const wrapper = shallowWithContext(
      <RuleLabel 
        color=""
        rule={rule}
        count={count}
        isActive={false}
        onClick={jest.fn()}
      />
    );
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.childAt(0).node).toBe(rule);
    expect(wrapper.childAt(1).childAt(0).node).toBe(`(${count})`);
  });
  it('toggles color when isActive prop changes', () => {
    const color = '#000000';
    const wrapper = shallowWithContext(
      <RuleLabel 
        color={color}
        rule={''}
        count={''}
        isActive={false}
        onClick={jest.fn()}
      />
    );
    expect(wrapper.props().style.backgroundColor).toBe('transparent');
    wrapper.setProps({ isActive: true });
    expect(wrapper.props().style.backgroundColor).toBe(color);
    wrapper.setProps({ isActive: false });
    expect(wrapper.props().style.backgroundColor).toBe('transparent');
  });
  it('invokes the onClick callback prop', () => {
    const onClick = jest.fn();
    const wrapper = shallowWithContext(
      <RuleLabel 
        color={''}
        rule={''}
        count={''}
        isActive={false}
        onClick={onClick}
      />
    );
    wrapper.simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });
});
