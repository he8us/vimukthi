import {createSelector} from 'reselect';

export const TODO_STATUS_ACTIVE = 'active';
export const TODO_STATUS_COMPLETED = 'completed';
export const TODO_STATUS_ALL = 'all';

const getTodos = (state) => state.todo.todos;

export const getCurrentFilter = (state, props) => {
    if (props.match.params.status === undefined) {
        return TODO_STATUS_ALL;
    }
    return props.match.params.status
}

export const getTodosWithFilters = createSelector(
    [getTodos, getCurrentFilter],
    (todos, filter) => {
        switch (filter) {
            case TODO_STATUS_ACTIVE:
                return todos.filter(t => !t.completed);
            case TODO_STATUS_COMPLETED:
                return todos.filter(t => t.completed);
            default:
                return todos;
        }
    }
)

export const getActiveTodoCount = createSelector(
    [getTodos],
    (todos) => {
        return todos.reduce(function (count, todo) {
            return todo.completed ? count : count + 1;
        }, 0);
    }
)

export const getCompletedTodoCount = createSelector(
    [getTodos, getActiveTodoCount],
    (todos, activeTodoCount) => {
        return todos.length - activeTodoCount;
    }
)
