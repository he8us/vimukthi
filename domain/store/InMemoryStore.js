// @flow

import type {StoreInterface} from "./StoreInterface";
import {Todo} from "../models/Todo";
import {Exception} from "../Errors/Exception";

export class InMemoryStore implements StoreInterface<Todo> {
    _store: Array<Todo> = [];

    async add(todo: Todo | Array<Todo>): Promise<Todo | void> {
        if (todo instanceof Todo) {
            this._store.push(todo);
            return todo;
        }

        if (todo.length === 0) {
            throw new Exception("Cannot add an empty list of todos");
        }

        let item;
        for (item of todo) {
            await this.add(item);
        }
        return item;
    }

    async save(todo: Todo): Promise<Todo> {
        let index = this._getItemIndex(todo);
        this._store[index] = todo;
        return todo;
    }

    async clear(): Promise<boolean> {
        this._store = [];
        return true;
    }

    async delete(todo: Todo): Promise<boolean> {
        this._store = this._store.filter((item: Todo): boolean => {
            return item.getId() !== todo.getId();
        });

        return true;
    }

    async findAll(): Promise<Array<Todo>> {
        return this._store;
    }

    async findById(id: string): Promise<Todo | void> {
        return this._store.filter((item: Todo) => {
            return item.getId() === id;
        }).shift();
    }

    async findByField(fieldName: typeof Todo.FIELD_ID | typeof Todo.FIELD_LABEL | typeof Todo.FIELD_COMPLETED, value: any): Promise<Array<Todo>> {
        let checkMethod;

        switch (fieldName) {
            case Todo.FIELD_ID:
                //$FlowFixMe
                return await this.findById(value);
            case Todo.FIELD_COMPLETED:
                checkMethod = "isCompleted";
                break;

            case Todo.FIELD_LABEL:
                checkMethod = "getLabel";
                break;
            default:
                throw new Exception(`Undefined field ${fieldName}`);
        }

        return this._store.filter((item: Todo): boolean => {
            //$FlowFixMe
            return item[checkMethod]() === value;
        });
    }

    _getItemIndex(todo: Todo): number {
        return this._store.findIndex((item: Todo): boolean => {
            return todo.getId() === item.getId();
        });
    }
}
