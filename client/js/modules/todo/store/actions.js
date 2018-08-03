import HTTP from '../../../utils/Http';
import * as actions from './actionTypes';

export function asynFunctionInit() {
    return {
        type: actions.TODOS_ASYNC_INIT
    }
}

export function loadTodos() {
    return dispatch => {
        dispatch(asynFunctionInit());
        HTTP.get('/todo').then(
            todos => {
                dispatch(loadTodosSuccess(todos.data));
            }
        );
    }
}

export function loadTodosSuccess(payload) {
    return {
        type: actions.LOAD_TODOS_SUCCESS,
        payload: payload
    }
}

export function addTodo(payload) {
    return dispatch => {
        dispatch(asynFunctionInit())
        HTTP.post('/todo', payload).then(
            todo => {
                dispatch(addTodoSuccess(todo.data));
            }
        ).catch(
            err => {
                addTodoFaliure(err);
            }
        )
    }
}

export function addTodoSuccess(payload) {
    return {
        type: actions.ADD_TODO_SUCCESS,
        payload
    }
}

export function addTodoFaliure(payload) {
    return {
        type: actions.ADD_TODO_FALIURE,
        payload
    }
}

export function udpateTodo({id, label, completed}) {
    return dispatch => {
        dispatch(asynFunctionInit());
        HTTP.put('/todo/' + id, {label, completed}).then(
            todo => {
                dispatch(updateTodoSuccess(todo.data))
            }
        ).catch(
            err => {
                dispatch(udpateTodoFaliure(err))
            }
        )
    }
}

export function updateTodoSuccess(payload) {
    return {
        type: actions.UPDATE_TODO_SUCCESS,
        payload
    }
}

export function udpateTodoFaliure(payload) {
    return {
        type: actions.UPDATE_TODO_FALIURE,
        payload
    }
}

export function deleteTodo(payload) {
    return dispatch => {
        dispatch(asynFunctionInit());
        HTTP.delete('/todo/' + payload).then(
            todo => {
                dispatch(deleteTodoSuccess(payload))
            }
        ).catch(
            err => {
                dispatch(deleteTodoFaliure(err))
            }
        )
    }
}


export function deleteTodoSuccess(payload) {
    return {
        type: actions.DELETE_TODO_SUCCESS,
        payload
    }
}

export function deleteTodoFaliure(payload) {
    return {
        type: actions.DELETE_TODO_FALIURE,
        payload
    }
}

export function updateCurrentEdit(payload) {
    return {
        type: actions.UPDATE_CURRENT_TODO,
        payload
    }
}
