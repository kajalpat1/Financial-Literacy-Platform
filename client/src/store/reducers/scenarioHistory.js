
import { ADD_CHOICE, CLEAR_CHOICES } from '../actionTypes';

const DEFAULT_STATE = [];

export default function scenarioHistory(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ADD_CHOICE:
      // append the new choice string to the array
      return [...state, action.choice];
    case CLEAR_CHOICES:
      return [];
    default:
      return state;
  }
}
