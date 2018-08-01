// @flow

import type {StoreInterface} from "../store/StoreInterface";
import type {TodoJSONUpdate} from "../models/Todo";
import {Todo} from "../models/Todo";
import {InMemoryStore} from "../store/InMemoryStore";
import {TodoCollection} from "../models/TodoCollection";
import {NotFoundException} from "../Errors/NotFoundException";
import {Exception} from "../Errors/Exception";

export class TodoRepository {
    _store: StoreInterface<Todo>;

    constructor(store: StoreInterface<Todo> = new InMemoryStore()) {
        this._store = store;
    }

    async save(todo: Todo): Promise<Todo> {
        return await this._store.save(todo);
    }

    async update(json: TodoJSONUpdate): Promise<Todo> {

        let todo = await this.getById(json.id);

        if (todo === undefined) {
            throw new NotFoundException('Todo not found');
        }

        if (json.label !== undefined) {
            todo = todo.setLabel(json.label);
        }

        if (json.completed === false) {
            todo = todo.activate();
        }
        else if (json.completed === true) {
            todo = todo.complete();
        }

        todo = await this.save(todo);
        if (!todo) {
            throw new Exception('Problem while deleting');
        }

        return todo;
    }

    async add(todo: Todo): Promise<Todo | void> {
        return await this._store.add(todo);
    }

    async getAll(): Promise<TodoCollection> {
        let todos = await this._store.findAll();
        return new TodoCollection(todos);
    }

    async clear(): Promise<boolean> {
        return await this._store.clear();
    }

    async getById(id: string): Promise<Todo | void> {
        return await this._store.findById(id);
    }

    async delete(id: string): Promise<Todo | void> {
        let todo = await this.getById(id);

        if (todo === undefined) {
            throw new NotFoundException('Todo not found');
        }
        return await this._store.delete(todo);
    }
}
