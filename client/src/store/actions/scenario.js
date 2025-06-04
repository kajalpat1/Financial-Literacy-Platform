
import { ADD_CHOICE, CLEAR_CHOICES } from '../actionTypes';


export const addChoice = choice => ({
  type: ADD_CHOICE,
  choice
});

export const clearChoices = () => ({
  type: CLEAR_CHOICES
});
