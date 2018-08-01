// @flow
import type {SerializableInterface} from "../../domain/models/SerializableInterface";
import type {ResponseInterface} from "./ResponseInterface";
import {Exception} from "../../domain/Errors/Exception";


export class AbstractSuccessResponse implements SerializableInterface, ResponseInterface {
    getCode(): number {
        return 200;
    }

    toJSON() {
        throw new Exception('toJSON should be implemented in child class');
    }
}
