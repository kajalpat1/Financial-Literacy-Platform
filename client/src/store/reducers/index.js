import {combineReducers} from 'redux';


import auth from './auth';
import error from './error';
import {polls, currentPoll} from './polls';


const rootReducer = combineReducers({
    auth,
    error,
    polls,
    currentPoll // this must be included
  });

  export default rootReducer;