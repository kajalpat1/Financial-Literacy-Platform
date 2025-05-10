import api from'../../services/api';
import {SET_POLLS, SET_CURRENT_POLL} from '../actionTypes';
import {addError, removeError} from './error';

export const setPolls = polls => ({
    type: SET_POLLS,
    polls
});


export const setCurrentPoll = poll => ({
    type: SET_CURRENT_POLL,
    poll
});

export const getPolls = () => {
    return async dispath => {
        try {
            const polls = await api.call('get', 'polls');
            dispatch(setPolls(polls));
            dispatch(removeError());
        }
        catch(err) {
            const error = err.response.data;
            dispatch(addError(error.messsage));
        }
    }
}

export const getUserPolls = () => {
    return async dispatch => {
        try {
            const polls = await api.call('get', 'polls/user');
            dispatch(setPolls(polls));
            dispatch(removeError());

        } catch(err) {
            const error = err.response.data;
            dispatch(addError(error.message));
        }
    }
}