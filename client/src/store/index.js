import { configureStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const DEFAULT_STATE = {
    error: {message: null}
};

export const store = configureStore(
    rootReducer,
    DEFAULT_STATE,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS__EXTENSION__()
    )
);

