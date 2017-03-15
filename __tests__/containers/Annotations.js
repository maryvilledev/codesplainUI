import React from 'react';
import { shallow } from 'enzyme';

import { Annotations } from '../../src/containers/Annotations';

const mockAnnotation = "They're just robots.";
const mockSnippetInformation = {
  lineNumber: 2,
  lineText: 'Galactic Imperial'
};
const mockDispatch = jest.fn();

describe('<Annotations />', () => {
  beforeEach(() => {
    mockDispatch.mockReset();
  });

  it('closes the annotation panel on handleCloseAnnotation', () => {
    const wrapper = shallow(
      <Annotations
        annotation={mockAnnotation}
        isDisplayingAnnotation={true}
        readOnly={true}
        snippetInformation={mockSnippetInformation}
        dispatch={mockDispatch}
      />
    );
    wrapper.instance().handleCloseAnnotation();
    expect(mockDispatch.mock.calls[0]).toBeDefined();
  })
});
