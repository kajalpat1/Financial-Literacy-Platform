import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';

const DEFAULT_ERROR_STATE = { message: null };

const errorReducer = (state = DEFAULT_ERROR_STATE, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return { ...state, message: action.error };
    case REMOVE_ERROR:
      return { ...state, message: null };
    default:
      return state;
  }
};

export default errorReducer;