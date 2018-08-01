// @flow
import type {SerializableInterface} from "./SerializableInterface";
import type {TodoJSONExport} from "./Todo";
import {Todo} from "./Todo";

export type TodoCollectionJSONExport = Array<TodoJSONExport>;

export class TodoCollection implements SerializableInterface {

    _store: Array<Todo> = [];

    constructor(todos: Array<Todo> = []) {
        this._store = this.constructor.ensureTodos(todos);
    }

    static ensureTodos(todos: Array<Todo>): Array<Todo> {
        let tmp = [];

        for (let todo: Todo of todos) {

            if (todo instanceof Todo) {
                tmp.push(todo);
                continue;
            }

            todo = Todo.fromJSON(todo);
            tmp.push(todo);
        }

        return tmp;
    }

    toJSON(): TodoCollectionJSONExport {
        let tmp = [];
        for (let todo: Todo of this._store) {
            tmp.push(todo.toJSON());
        }
        return tmp;
    }
}
