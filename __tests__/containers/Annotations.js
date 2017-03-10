import React from 'react'
import { shallow, mount, render } from 'enzyme'

import { Annotations } from '../../src/containers/Annotations'

const mockAnnotation = "They're just robots."
const mockSnippetInformation = {
  lineNumber: 2,
  lineText: 'Galactic Imperial'
}
const mockDispatch = jest.fn()

describe('<Annotations />', () => {
  const wrapper = shallow(
    <Annotations
      annotation={mockAnnotation}
      isDisplayingAnnotation={true}
      readOnly={true}
      snippetInformation={mockSnippetInformation}
      dispatch={mockDispatch}
    />
  )
  it('saves the annotation on handleSaveAnnotation', () => {
    const annotation = "They're bureaucrats!"
    const expected = {
      annotation,
      ...mockSnippetInformation
    }
    wrapper.instance().handleSaveAnnotation(annotation)
    const { payload } = mockDispatch.mock.calls[0][0];
    expect(payload).toEqual(expected)
  });
  it('closes the annotation panel on handleCloseAnnotation', () => {
    wrapper.instance().handleCloseAnnotation()
    expect(mockDispatch.mock.calls[1]).toBeDefined()
  })
});
