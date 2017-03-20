import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RuleLabel from '../../src/components/RuleLabel';

describe('<RuleLabel />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  describe('snapshot tests', () => {
    it('matches snapshot of when it is active', () => {
      const wrapper = shallowWithContext(
        <RuleLabel
          color="#FF0000"
          rule="Example Rule"
          count="1"
          isActive={true}
          onClick={jest.fn()}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('matches snapshot of when it is not active', () => {
      const wrapper = shallowWithContext(
        <RuleLabel
          color="#FF0000"
          rule="Example Rule"
          count="1"
          isActive={false}
          onClick={jest.fn()}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('prop: rule', () => {
    it('is rendered as a child', () => {
      const rule = 'Those are my eyeholes, man!';
      const wrapper = shallowWithContext(
        <RuleLabel
          color=""
          rule={rule}
          count="0"
          isActive={false}
          onClick={jest.fn()}
        />
      );
      expect(wrapper.childAt(0).text()).toEqual(rule);
    });
  });

  describe('prop: count', () => {
    const count = "3";
    const wrapper = shallowWithContext(
      <RuleLabel
        color=""
        rule=""
        count={count}
        isActive={false}
        onClick={jest.fn()}
      />
    );
    expect(wrapper.find('span').text()).toBe(`(${count})`);
  });

  describe('prop: onClick', () => {
    it('should forward it', () => {
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
      expect(wrapper.find('div').prop('onClick')).toEqual(onClick);
    });

    it('is called when the component is clicked', () => {
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
      expect(onClick).toHaveBeenCalled();
    });
  });
});
