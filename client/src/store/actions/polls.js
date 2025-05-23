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

  export const vote = (path, data, navigate) => {
    return async dispatch => {
      try {
        const response = await api.call('post', `polls/${path}`, data);
        const { poll, selected } = response;
  
        dispatch(setCurrentPoll(poll));
        dispatch(removeError());
  
        if (navigate && selected) {
            const optionData = poll.options.find(opt => opt.option === selected);
            let rate = 5;
            let value = 5000;
          
            // infer simple logic based on keywords (customize this!)
            if (selected.toLowerCase().includes('invest')) {
              rate = 8;
            } else if (selected.toLowerCase().includes('save')) {
              rate = 5;
            } else if (selected.toLowerCase().includes('spend')) {
              value = 1000; // spending $1000/month
            }
          
            navigate(`/scenario?type=${selected.toLowerCase()}&value=${value}&rate=${rate}`);
          }
  
      } catch (err) {
        const msg =
          err.response?.data?.error?.message ||
          err.response?.data?.message ||
          err.message;
        dispatch(addError(msg));
      }
    };
  };