import {combineReducers} from 'redux';


import auth from './auth';
import error from './error';


const rootReducer = combineReducers({
    auth,
    error // <-- this must be included
  });

  export default rootReducer;