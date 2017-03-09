import * as actions from '../actions/annotation';

export const initialState = {
  isOpen: false,
};

const annotation = (state = initialState, action) => {
  switch (action.type) {
    case actions.OPEN_ANNOTATION_PANEL: {
      if (state.isOpen) {
        return state
      };
      return {
        ...state,
        isOpen: true,
        snippetInformation: action.payload
      };
    }
    case actions.CLOSE_ANNOTATION_PANEL: {
      if (!state.isOpen) {
        return state;
      }
      return {
        ...state,
        isOpen: false,
      };
    }
    default: {
      return state;
    }
  }
}

export default annotation;
