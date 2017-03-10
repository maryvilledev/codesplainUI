import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AnnotationEditor from '../../src/components/AnnotationEditor';

const mockFunctionProps = {
  closeAnnotation: jest.fn(),
  saveAnnotation: jest.fn(),
};

describe('<AnnotationEditor />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <AnnotationEditor
        annotation='some annotation'
        snippetInformation={{
          lineNumber: 0,
          lineText: 'foo',
        }}
        {...mockFunctionProps}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
