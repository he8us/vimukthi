// @flow
import uuid from "uuid/v1";
import {ParameterValidationException} from "../Errors/ParameterValidationException";
import type {SerializableInterface} from "./SerializableInterface";

export type TodoJSONExport = {
    id: string,
    label: string,
    completed: boolean
}

export type TodoJSONImport = {
    id?: string,
    label: string,
    completed?: boolean
}

export type TodoJSONUpdate = {
    id: string,
    label?: string,
    completed?: boolean
}

export class Todo implements SerializableInterface {

    static FIELD_ID: string = '_id';
    static FIELD_LABEL: string = '_label';
    static FIELD_COMPLETED: string = '_completed';

    _id: string;
    _label: string;
    _completed: boolean = false;

    constructor(id: string, label: string, completed?: boolean): void {
        if (id === undefined || id.length === 0) {
            throw new ParameterValidationException("The todo should have an id");
        }

        this.constructor._validateLabel(label);

        this._id = id;
        this._label = label;
        this._completed = completed || this._completed;
    }

    static _validateLabel(str: string): void {
        if (str === undefined || str.length === 0) {
            throw new ParameterValidationException("The label should not be null or empty");
        }
    }

    static create(label: string, completed?: boolean): Todo {
        this._validateLabel(label);
        return new Todo(uuid(), label, completed);
    }

    static restore(id: string, label: string, completed?: boolean): Todo {
        return new Todo(id, label, completed);
    }

    static fromJSON(json: TodoJSONImport): Todo {

        if (json.id === undefined) {
            return this.create(json.label, json.completed);
        }

        return this.restore(json.id, json.label, json.completed);
    }

    static fromString(str: string): Todo {
        try {
            return this.fromJSON(JSON.parse(str));
        }
        catch (e) {
            throw new ParameterValidationException(e.message);
        }
    }

    getId(): string {
        return this._id;
    }

    getLabel(): string {
        return this._label;
    }

    setLabel(label: string): Todo {
        this.constructor._validateLabel(label);

        return new this.constructor(this._id, label, this._completed);
    }

    isCompleted(): boolean {
        return this._completed;
    }

    complete(): Todo {
        return new this.constructor(this._id, this._label, true);
    }

    activate(): Todo {
        return new this.constructor(this._id, this._label, false);
    }

    toJSON(): TodoJSONExport {
        return {
            id: this._id,
            label: this._label,
            completed: this._completed
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}
