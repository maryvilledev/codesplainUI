import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Editor from '../../src/components/Editor';

const mockFunctionProps = {
  onChange: jest.fn(),
  onGutterClick: jest.fn(),
  onParserRun: jest.fn(),
};

describe('<Editor />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <Editor
        AST={{}}
        filters={{}}
        markedLines={[]}
        readOnly={false}
        value=""
        {...mockFunctionProps}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
