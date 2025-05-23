import api from'../../services/api';
import {SET_POLLS, SET_CURRENT_POLL, DELETE_POLL} from '../actionTypes';
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
    return async dispatch => {
        try {
            const polls = await api.call('get', 'polls');
            dispatch(setPolls(polls));
            dispatch(removeError());
        }
        catch (err) {
            const msg =
                err.response?.data?.error?.message ||   
                err.response?.data?.message        ||   
                err.message;                            
            dispatch(addError(msg));
        }
    };
};

export const getUserPolls = () => {
    return async dispatch => {
        try {
            const polls = await api.call('get', 'polls/user');
            dispatch(setPolls(polls));
            dispatch(removeError());

        } catch (err) {
            const msg =
                err.response?.data?.error?.message ||   
                err.response?.data?.message        ||   
                err.message;                            
            dispatch(addError(msg));
        }
    };
};

export const createPoll = data => {
    return async dispatch => {
        try {
            const poll = await api.call('post', 'polls', data);
            dispatch(setCurrentPoll(poll));
            dispatch(removeError());
            
        } catch (err) {
            const msg =
                err.response?.data?.error?.message ||   
                err.response?.data?.message        ||   
                err.message;                            
            dispatch(addError(msg));
        }
    };
};

export const getCurrentPoll = path => {
    return async dispatch => {
        try {
            const poll = await api.call('get', `polls/${path}`);
            dispatch(setCurrentPoll(poll));
            dispatch(removeError());

        } catch (err) {
            const msg =
                err.response?.data?.error?.message ||   
                err.response?.data?.message        ||   
                err.message;                            
            dispatch(addError(msg));
        }
    };
};

export const deletePollSuccess = id => ({
    type: DELETE_POLL,
    id
  })
  
  export const deletePoll = id => {
    return async dispatch => {
      try {
      
        await api.call('delete', `polls/${id}`)
        dispatch(deletePollSuccess(id))
        dispatch(removeError())
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          err.response?.data?.error?.message ||
          err.message
        dispatch(addError(msg))
      }
    }
  }

  export const vote = (pollId, data, navigate) => {
    return async dispatch => {
      try {
        const response = await api.call('post', `polls/${pollId}`, data);
        const { poll, selected } = response;
  
        dispatch({ type: SET_CURRENT_POLL, poll });
        dispatch(removeError());
  
        if (navigate && selected) {
          // infer scenario params
          const key = selected.toLowerCase();
          let rate = 5;
          let value = 5000;
          if (key.includes('invest'))       rate = 8;
          else if (key.includes('save'))    rate = 5;
          else if (key.includes('spend'))   value = 1000;
  
          navigate(`/scenario?type=${key}&value=${value}&rate=${rate}`);
        }
      } catch (err) {
        const msg =
          err.response?.data?.error?.message ||
          err.response?.data?.message        ||
          err.message;
        dispatch(addError(msg));
      }
    };
  };