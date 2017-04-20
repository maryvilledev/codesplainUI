import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ReferenceArea from '../../src/components/ReferenceArea';

describe('<ReferenceArea />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<ReferenceArea />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
