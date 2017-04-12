import * as actions from '../actions/annotation';

export const initialState = {
  isDisplayingAnnotation: false,
  lineAnnotated: {},
};

const annotation = (state = initialState, action) => {
  switch (action.type) {
    case actions.OPEN_ANNOTATION_PANEL: {
      return {
        ...state,
        isDisplayingAnnotation: true,
        lineAnnotated: action.payload,
      };
    }
    case actions.CLOSE_ANNOTATION_PANEL: {
      if (!state.isDisplayingAnnotation) {
        return state;
      }
      return {
        ...state,
        isDisplayingAnnotation: false,
        lineAnnotated: {},
      };
    }
    default: {
      return state;
    }
  }
}

export default annotation;
