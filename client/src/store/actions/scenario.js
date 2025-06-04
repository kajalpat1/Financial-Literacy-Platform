import { ADD_CHOICE, CLEAR_CHOICES } from '../actionTypes';

export const addChoice = (choiceObject) => ({
  type: ADD_CHOICE,
  choice: choiceObject
});

export const clearChoices = () => ({
  type: CLEAR_CHOICES
});

