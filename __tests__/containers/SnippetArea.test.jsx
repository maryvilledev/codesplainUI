import React from 'react';
import { shallow } from 'enzyme';

import { SnippetArea } from '../../src/containers/SnippetArea';

const mockDispatch = jest.fn();
const mockAnnotations = {
  2: {
    annotation: 'They\'re just robots!',
    lineNumber: 2,
    lineText: 'Galactic Imperial',
  },
};
const mockAST = {};
const mockFilters = {
  rick: {
    selected: false,
    prettyTokenName: 'Rick Sanchez',
  },
  morty: {
    selected: false,
    prettyTokenName: 'Morty Smith',
  },
};
const mockPermissions = {
  canRead: true,
  canEdit: true,
};
const mockSnippet = 'print(\'Squanch ya later!\')';
const mockSnippetTitle = 'Squanchy AI';
const mockOpenLine = 2;
const mockOrgs = ['galactic-federation'];
const mockSelectedOrg = 'galactic-federation';

describe('<SnippetArea />', () => {
  beforeEach(() => {
    mockDispatch.mockReset();
  });
  const wrapper = shallow(
    <SnippetArea
      dispatch={mockDispatch}
      annotations={mockAnnotations}
      snippet={mockSnippet}
      snippetTitle={mockSnippetTitle}
      AST={mockAST}
      filters={mockFilters}
      readOnly
      snippetLanguage="python3"
      permissions={mockPermissions}
      orgs={mockOrgs}
      selectedOrg={mockSelectedOrg}
    />,
  );
  it('updates the snippet on handleSnippetChanged', () => {
    const snippet = 'print(\'Can I squanch in your room?\')';
    wrapper.instance().handleSnippetChanged(snippet);
    const { payload } = mockDispatch.mock.calls[0][0];
    expect(payload).toEqual(snippet);
  });
  it('updates the title on handleTitleChanged', () => {
    const title = 'Squanchbot';
    wrapper.instance().handleTitleChanged({ target: { value: title } });
    const { payload } = mockDispatch.mock.calls[0][0];
    expect(payload).toEqual(title);
  });
  it('opens a dialog on handleLock', () => {
    wrapper.instance().handleLock();
    expect(wrapper.state().lockDialogOpen).toBe(true);
  });
  it('toggles readOnly on handleToggleReadOnly', () => {
    wrapper.instance().handleToggleReadOnly();
    expect(mockDispatch.mock.calls[0]).toBeDefined();
  });
  it('closes a dialog on handleCloseModal', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state().lockDialogOpen).toBe(false);
  });
  it('opens the annotation panel on handleGutterClick', () => {
    const lineNumber = 2;
    const lineText = 'Do you squanch my squanch?';
    wrapper.instance().handleGutterClick(lineNumber, lineText);
    const { payload } = mockDispatch.mock.calls[0][0];
    expect(payload).toEqual({ lineNumber, lineText });
  });
});
