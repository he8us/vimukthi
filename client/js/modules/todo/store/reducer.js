import * as actions from './actionTypes';

const intialState = {
    loading: false,
    currentEdit: null,
    todos: []
}

export default function reducer(state = intialState, {type, payload}) {
    switch (type) {
        case actions.TODOS_ASYNC_INIT:
            return {...state, loading: true}
        case actions.LOAD_TODOS_SUCCESS:
            return {...state, loading: false, todos: payload}
        case actions.ADD_TODO_SUCCESS:
            return {...state, loading: false, todos: [...state.todos, payload]}
        case actions.UPDATE_TODO_SUCCESS:
            return updateTodo(state, payload);
        case actions.DELETE_TODO_SUCCESS:
            return deleteTodo(state, payload);
        case actions.UPDATE_CURRENT_TODO:
            return {...state, currentEdit: payload}
        default:
            return state;
    }
}

function updateTodo(state, payload) {
    const udpatedTodos = state.todos.map(
        todo => (
            todo.id == payload.id ? payload : todo
        )
    );
    return {...state, loading: false, currentEdit: null, todos: udpatedTodos};
}

function deleteTodo(state, payload) {
    const udpatedTodos = state.todos.filter(
        todo => (todo.id !== payload)
    );
    return {...state, loading: false, todos: udpatedTodos};
}
