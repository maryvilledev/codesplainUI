import * as actions from '../../src/actions/annotation';
import reducer, { initialState } from '../../src/reducers/annotation';

describe('Reducer: Annotation', () => {
  it('should have initial state', () => {
    const initial = {
      isDisplayingAnnotation: false,
      snippetInformation: {},
    }
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle OPEN_ANNOTATION_PANEL', () => {
    const snippetInformation = {
      lineNumber: 1,
      lineText: 'Wubba lubba dub dub!',
    };
    const action = {
      type: actions.OPEN_ANNOTATION_PANEL,
      payload: snippetInformation
    }
    const expected = {
      ...initialState,
      isDisplayingAnnotation: true,
      snippetInformation: action.payload
    }
    expect(reducer(undefined, action)).toEqual(expected)
  });

  it('should handle CLOSE_ANNOTATION_PANEL', () => {
    const action = {
      type: actions.CLOSE_ANNOTATION_PANEL
    };
    const expected = {
      ...initialState,
      isDisplayingAnnotation: false,
      snippetInformation: {}
    };
    expect(reducer(undefined, action)).toEqual(expected);
  });
});
