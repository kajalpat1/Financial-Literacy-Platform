import {SET_POLLS, SET_CURRENT_POLL} from '../actionTypes';

export const polls = (state = [], action) => {
    switch(action.type) {
        case SET_POLLS:
            return action.polls;
        default:
            return state;
    }
}

//polls live in an array
//one poll is an empty object

export const currentPoll = (state = {}, action) => {
    switch(action.type) {
        case SET_CURRENT_POLL:
            return action.poll;
        default:
            return state;
    }
}