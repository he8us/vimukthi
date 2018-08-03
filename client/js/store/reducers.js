import {combineReducers} from 'redux';

import todoReducer from '../modules/todo/store/reducer';

export default combineReducers({todo: todoReducer});
