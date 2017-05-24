import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SnippetAreaToolbar from '../../src/components/SnippetAreaToolbar';

const defaultProps = {
  canEdit: true,
  deleteEnabled: true,
  language: 'python',
  onDeleteClick: jest.fn(),
  onLanguageChange: jest.fn(),
  onLockClick: jest.fn(),
  onOrgChanged: jest.fn(),
  onSaveAsClick: jest.fn(),
  onSaveClick: jest.fn(),
  onThemeChange: jest.fn(),
  onTitleChange: jest.fn(),
  orgs: ['galactic-federation'],
  readOnly: false,
  saveEnabled: true,
  selectedOrg: 'galactic-federation',
  title: '',
};

describe('<SnippetAreaToolbar />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  describe('snapshot tests', () => {
    it('matches snapshot of when it is not read-only', () => {
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar {...defaultProps} />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('matches snapshot of when it is read-only', () => {
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          {...defaultProps}
          readOnly
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('prop: title', () => {
    it('is rendered in a TextField', () => {
      const title = 'Jan Quadrant Vincent 16';
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          {...defaultProps}
          title={title}
        />,
      );
      expect(wrapper.find('TextField[id="titleField"]').prop('value')).toEqual(title);
    });
  });

  describe('prop: onTitleChange', () => {
    it('is forwarded to the title TextField', () => {
      const onTitleChange = jest.fn();
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          {...defaultProps}
          onTitleChange={onTitleChange}
        />,
      );
      const titleField = wrapper.find('[id="titleField"]');
      expect(titleField.prop('onChange')).toEqual(onTitleChange);
      titleField.simulate('change');
      expect(onTitleChange).toHaveBeenCalled();
    });
  });

  describe('prop: onLockClick', () => {
    it('is forwarded to the LockButton', () => {
      const onLockClick = jest.fn();
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          {...defaultProps}
          onLockClick={onLockClick}
        />,
      );
      expect(wrapper.find('LockButton').prop('onClick')).toEqual(onLockClick);
    });
  });

  describe('prop: onSaveClick', () => {
    it('is forwarded to the SaveMenu', () => {
      const onSaveClick = jest.fn();
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          {...defaultProps}
          onSaveClick={onSaveClick}
        />,
      );
      expect(wrapper.find('SaveMenu').prop('onSaveClick')).toBe(onSaveClick);
    });
  });

  describe('prop: onSaveAsClick', () => {
    it('is forwarded to the SaveMenu', () => {
      const onSaveAsClick = jest.fn();
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          {...defaultProps}
          onSaveAsClick={onSaveAsClick}
        />,
      );
      expect(wrapper.find('SaveMenu').prop('onSaveAsClick')).toBe(onSaveAsClick);
    });
  });

  describe('prop: readOnly', () => {
    it('is forwarded to the LockButton', () => {
      const readOnly = false;
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          {...defaultProps}
          readOnly={readOnly}
        />,
      );
      expect(wrapper.find('LockButton').prop('readOnly')).toBe(readOnly);
    });
    it('is forwarded to the LanguageSelector\'s disabled prop', () => {
      const readOnly = false;
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          {...defaultProps}
          readOnly={readOnly}
        />,
      );
      expect(wrapper.find('LanguageSelector').prop('disabled')).toBe(readOnly);
    });
  });

  describe('prop: onThemeChange', () => {
    it('is forwarded to the EditorMenu', () => {
      const onChange = () => {};
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          {...defaultProps}
          onThemeChange={onChange}
        />,
      );
      const editorMenu = wrapper.find('EditorMenu');
      expect(editorMenu.prop('onChange')).toEqual(onChange);
    });
  });

  describe('prop: codeMirrorTheme', () => {
    it('is forwarded to the EditorMenu', () => {
      const codeMirrorTheme = 'monokai';
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar
          {...defaultProps}
          codeMirrorTheme={codeMirrorTheme}
        />,
      );
      const editorMenu = wrapper.find('EditorMenu');
      expect(editorMenu.prop('codeMirrorTheme')).toEqual(codeMirrorTheme);
    });
  });
});
