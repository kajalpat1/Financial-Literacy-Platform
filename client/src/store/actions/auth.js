import {addError, removeError} from './error';
import {SET_CURRENT_USER} from '../actionTypes';
import api from '../../services/api';
import { clearChoices } from './scenario';


export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    user
});

export const setToken = token => {
    api.setToken(token);
};


export const logout = () => {
    return dispatch => {
        localStorage.clear();
        api.setToken(null);
        dispatch(setCurrentUser({}));
        dispatch(removeError());
        dispatch(clearChoices());
        
        
    };
};

export const authUser = (path, data) => {
    return async dispatch => {
        try {
            const{token, ...user} = await api.call('post', `auth/${path}`, data);
            localStorage.setItem('jwtToken', token); //local storage is browser, allows to stay log in
            api.setToken(token);
            dispatch(setCurrentUser(user));
            dispatch(removeError());
        }
        catch (err) {
            const msg =
                err.response?.data?.error?.message ||   
                err.response?.data?.message        ||   
                err.message;                            
            dispatch(addError(msg));
        }
    }
}