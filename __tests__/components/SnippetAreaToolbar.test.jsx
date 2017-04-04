import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SnippetAreaToolbar from '../../src/components/SnippetAreaToolbar';

describe('<SnippetAreaToolbar />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  describe('snapshot tests', () => {
    it('matches snapshot of when it is not read-only', () => {
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          title={''}
          onTitleChange={jest.fn()}
          readOnly={false}
          onLockClick={jest.fn()}
          onSaveClick={jest.fn()}
          onSaveAsClick={jest.fn()}
          saveEnabled={true}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('matches snapshot of when it is read-only', () => {
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          title={''}
          onTitleChange={jest.fn()}
          readOnly={true}
          onLockClick={jest.fn()}
          onSaveClick={jest.fn()}
          onSaveAsClick={jest.fn()}
          saveEnabled={true}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('prop: title', () => {
    it('is rendered in a TextField', () => {
      const title = 'Jan Quadrant Vincent 16';
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          title={title}
          onTitleChange={jest.fn()}
          readOnly={false}
          onLockClick={jest.fn()}
          onSaveClick={jest.fn()}
          onSaveAsClick={jest.fn()}
          saveEnabled={true}
        />
      );
      expect(wrapper.find('TextField[id="titleField"]').prop('value')).toEqual(title);
    });
  });

  describe('prop: onTitleChange', () => {
    it('is forwarded to the title TextField', () => {
      const onTitleChange = jest.fn();
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          title={''}
          onTitleChange={onTitleChange}
          readOnly={false}
          onLockClick={jest.fn()}
          onSaveClick={jest.fn()}
          onSaveAsClick={jest.fn()}
          saveEnabled={true}
        />
      );
      const titleField = wrapper.find('[id="titleField"]');
      expect(titleField.prop('onChange')).toEqual(onTitleChange);
      titleField.simulate('change');
      expect(onTitleChange).toHaveBeenCalled();
    });
  });

  describe('the Language Selector dropdown', () => {
    it('should be disabled', () => {
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          title={''}
          onTitleChange={jest.fn()}
          readOnly={false}
          onLockClick={jest.fn()}
          onSaveClick={jest.fn()}
          onSaveAsClick={jest.fn()}
          saveEnabled={true}
        />
      );
      const languageSelector = wrapper.find('[id="languageSelector"]');
      expect(languageSelector.prop('disabled')).toBe(true);
    });
  });

  describe('prop: onLockClick', () => {
    it('is forwarded to the LockButton', () => {
      const onLockClick = jest.fn();
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          title={''}
          onTitleChange={jest.fn()}
          readOnly={false}
          onLockClick={onLockClick}
          onSaveClick={jest.fn()}
          onSaveAsClick={jest.fn()}
          saveEnabled={true}
        />
      );
      expect(wrapper.find('LockButton').prop('onClick')).toEqual(onLockClick);
    });
  });

  describe('prop: onSaveClick', () => {
    it('forwarded to the SaveMenu', () => {
      const onSaveClick = jest.fn();
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          title={''}
          onTitleChange={jest.fn()}
          readOnly={false}
          onLockClick={jest.fn()}
          onSaveClick={onSaveClick}
          onSaveAsClick={jest.fn()}
          saveEnabled={true}
        />
      );
      expect(wrapper.find('SaveMenu').prop('onSaveClick')).toBe(onSaveClick);
    });
  });

  describe('prop: onSaveAsClick', () => {
    it('forwarded to the SaveMenu', () => {
      const onSaveAsClick = jest.fn();
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          title={''}
          onTitleChange={jest.fn()}
          readOnly={false}
          onLockClick={jest.fn()}
          onSaveClick={jest.fn()}
          onSaveAsClick={onSaveAsClick}
          saveEnabled={true}
        />
      );
      expect(wrapper.find('SaveMenu').prop('onSaveAsClick')).toBe(onSaveAsClick);
    });
  });
});
