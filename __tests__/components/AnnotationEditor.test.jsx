import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AnnotationEditor from '../../src/components/AnnotationEditor';

const mockFunctionProps = {
  closeAnnotation: jest.fn(),
  saveAnnotation: jest.fn(),
  onCloseEditor: jest.fn(),
};

describe('<AnnotationEditor />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <AnnotationEditor
        {...mockFunctionProps}
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('prop: annotation', () => {
    it('renders an empty Textfield if empty', () => {
      const wrapper = shallowWithContext(
        <AnnotationEditor
          {...mockFunctionProps}
        />,
      );
      expect(wrapper.find('TextField').prop('value')).toEqual('');
    });
    it('renders its contents into the TextField', () => {
      const annotation = 'Wubba lubba dub dub!';
      const wrapper = shallowWithContext(
        <AnnotationEditor
          annotation={annotation}
          {...mockFunctionProps}
        />,
      );
      expect(wrapper.find('TextField').prop('value')).toEqual(annotation);
    });
  });

  describe('save button', () => {
    it('is disabled when the textfield is empty', () => {
      const wrapper = shallowWithContext(
        <AnnotationEditor
          {...mockFunctionProps}
        />,
      );
      expect(wrapper.find('[label="Save"]').prop('disabled')).toBe(true);
    });
    it('is enabled when the textfield is not empty', () => {
      const annotation = 'Wubba lubba dub dub!';
      const wrapper = shallowWithContext(
        <AnnotationEditor
          annotation={annotation}
          {...mockFunctionProps}
        />,
      );
      expect(wrapper.find('[label="Save"]').prop('disabled')).toBe(false);
    });
  });
});
