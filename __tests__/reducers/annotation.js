import * as actions from '../../src/actions/annotation';
import reducer, { initialState } from '../../src/reducers/annotation';

describe('Reducer: Annotation', () => {
  describe('initialState', () => {
    it('should match snapshot', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });
  });

  it('should handle OPEN_ANNOTATION_PANEL', () => {
    const lineAnnotated = {
      lineNumber: 1,
      lineText: 'Wubba lubba dub dub!',
    };
    const action = {
      type: actions.OPEN_ANNOTATION_PANEL,
      payload: lineAnnotated,
    };
    const expected = {
      ...initialState,
      isDisplayingAnnotation: true,
      lineAnnotated: action.payload,
    };
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle CLOSE_ANNOTATION_PANEL', () => {
    const action = {
      type: actions.CLOSE_ANNOTATION_PANEL,
    };
    const expected = {
      ...initialState,
      isDisplayingAnnotation: false,
      lineAnnotated: {},
    };
    expect(reducer(undefined, action)).toEqual(expected);
  });
});
