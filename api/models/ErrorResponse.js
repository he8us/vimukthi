// @flow
import type {SerializableInterface} from "../../domain/models/SerializableInterface";
import type {ResponseInterface} from "./ResponseInterface";

export type ErrorResponseJSON = {
    code: number,
    message: string
}

export class ErrorResponse implements SerializableInterface, ResponseInterface {
    _message: string;
    _httpCode: number;

    constructor(message: string, code: number = 400) {
        this._message = message;
        this._httpCode = code;
    }

    getCode(): number {
        return this._httpCode;
    }

    toJSON(): ErrorResponseJSON {
        return {
            code: this._httpCode,
            message: this._message
        };
    }
}
