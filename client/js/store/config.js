import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers';

export default function (intialState = {}) {
    const enhancers = [
        applyMiddleware(thunk),
    ]

    if (process.env.NODE_ENV !== 'production') {
        window.devToolsExtension && enhancers.push(window.devToolsExtension())
    }

    const store = createStore(rootReducers, intialState, compose(...enhancers))

    return store;
}
