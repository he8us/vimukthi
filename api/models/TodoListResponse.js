// @flow
import type {SerializableInterface} from "../../domain/models/SerializableInterface";
import type {TodoCollectionJSONExport} from "../../domain/models/TodoCollection";
import {TodoCollection} from "../../domain/models/TodoCollection";
import {AbstractSuccessResponse} from "./AbstractSuccessResponse";


export class TodoListResponse extends AbstractSuccessResponse implements SerializableInterface {
    _collection: TodoCollection;

    constructor(todoCollection: TodoCollection) {
        super();
        this._collection = todoCollection;
    }

    toJSON(): TodoCollectionJSONExport {
        return this._collection.toJSON();
    }
}
