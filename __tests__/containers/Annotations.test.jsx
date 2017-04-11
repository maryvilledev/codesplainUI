import React from 'react';
import { shallow, mount } from 'enzyme';
import { Annotations } from '../../src/containers/Annotations';

const mockAnnotation = "They're just robots.";
const mocklineAnnotated = {
  lineNumber: 2,
  lineText: 'Galactic Imperial',
};
const mockDispatch = jest.fn();
const mockRouter = { params: 'Szechuan Sauce' };

describe('<Annotations />', () => {
  const wrapper = shallow(
    <Annotations
      annotation={mockAnnotation}
      isDisplayingAnnotation={true}
      readOnly={true}
      lineAnnotated={mocklineAnnotated}
      dispatch={mockDispatch}
      router={mockRouter}
    />
  );

  beforeEach(() => {
    mockDispatch.mockReset();
  });

  it('closes the annotation panel on handleCloseAnnotation', () => {
    wrapper.instance().handleCloseAnnotation();
    expect(mockDispatch.mock.calls[0]).toBeDefined();
  })
});
