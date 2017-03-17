import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SnippetAreaToolbar from '../../src/components/SnippetAreaToolbar';

describe('<SnippetAreaToolbar />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches the stored snapshot', () => {
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

  describe('the Snippet Name field', () => {
    it('is displayed', () => {
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
      const titleField = wrapper.find('[id="titleField"]');
      expect(titleField).toHaveLength(1);
    });
    it('renders the text in the title prop', () => {
      const title = 'Test Title';
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar 
          title={title}  
          onTitleChange={jest.fn()}
          readOnly={false}
          onLockClick={jest.fn()}
          onSaveClick={jest.fn()}
          onSaveAsClick={jest.fn()}
        />      
      );
      const titleField = wrapper.find('[id="titleField"]');
      expect(titleField.props().value).toBe(title);
    });
    it('should invoke onTitleChange callback prop', () => {
      const onTitleChange = jest.fn();
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar 
          title={''}  
          onTitleChange={onTitleChange}
          readOnly={false}
          onLockClick={jest.fn()}
          onSaveClick={jest.fn()}
          onSaveAsClick={jest.fn()}
        />      
      );
      wrapper.find('[id="titleField"]').simulate('change');
      expect(onTitleChange.mock.calls.length).toBe(1);
    });
  });
  
  describe('the Language Selector dropdown', () => {
    it('should be displayed', () => {
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
      const languageSelector = wrapper.find('[id="languageSelector"]');
      expect(languageSelector).toHaveLength(1);
    });
    it('should be disabled', () => {
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
      const languageSelector = wrapper.find('[id="languageSelector"]');
      expect(languageSelector.props().disabled).toBe(true);
    });
  });

  describe('the Lock Button', () => {
    it('should be displayed', () => {
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
      const lockButton = wrapper.find('[id="lockButton"]');
      expect(lockButton).toHaveLength(1);
    });
    it('passes the onLockClick callback', () => {
      const onLockClick = jest.fn();
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar 
          title={''}  
          onTitleChange={jest.fn()}
          readOnly={false}
          onLockClick={onLockClick}
          onSaveClick={jest.fn()}
          onSaveAsClick={jest.fn()}
        />      
      );
      const lockButton = wrapper.find('[id="lockButton"]');
      expect(lockButton.props().onClick).toBe(onLockClick);
    });
  });

  describe('the Save Menu', () => {
    it('is displayed', () => {
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
      const lockButton = wrapper.find('[id="saveMenu"]');
      expect(lockButton).toHaveLength(1);
    });
    it('passes the onSaveClick callback', () => {
      const onSaveClick = jest.fn();
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar 
          title={''}  
          onTitleChange={jest.fn()}
          readOnly={false}
          onLockClick={jest.fn()}
          onSaveClick={onSaveClick}
          onSaveAsClick={jest.fn()}
        />      
      );
      const saveMenu = wrapper.find('[id="saveMenu"]');
      expect(saveMenu.props().onSaveClick).toBe(onSaveClick);
    });
    it('passes the onSaveAsClick callback', () => {
      const onSaveAsClick = jest.fn();
      const wrapper = shallowWithContext(
        <SnippetAreaToolbar 
          title={''}  
          onTitleChange={jest.fn()}
          readOnly={false}
          onLockClick={jest.fn()}
          onSaveClick={jest.fn()}
          onSaveAsClick={onSaveAsClick}
        />      
      );
      const saveMenu = wrapper.find('[id="saveMenu"]');
      expect(saveMenu.props().onSaveAsClick).toBe(onSaveAsClick);
    })
  });
});
