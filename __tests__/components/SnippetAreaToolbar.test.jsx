import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SnippetAreaToolbar from '../../src/components/SnippetAreaToolbar';

describe('<SnippetAreaToolbar />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <SnippetAreaToolbar 
        title={''}  
        onTitleChange={jest.fn()}
        readOnly={false}
        onLockClick={jest.fn()}
        onSaveClick={jest.fn()}
        onSaveAsClick={jest.fn()}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
