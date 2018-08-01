// @flow
import type {ResponseInterface} from "./ResponseInterface";
import {AbstractSuccessResponse} from "./AbstractSuccessResponse";
import type {SerializableInterface} from "../../domain/models/SerializableInterface";
import type {TodoJSONExport} from "../../domain/models/Todo";
import {Todo} from "../../domain/models/Todo";


export class TodoDetailsResponse extends AbstractSuccessResponse implements ResponseInterface, SerializableInterface {
    _todo: Todo;

    constructor(todo: Todo): void {
        super();
        this._todo = todo;
    }

    toJSON(): TodoJSONExport {
        return this._todo.toJSON();
    }
}
