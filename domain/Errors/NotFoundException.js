// @flow
import {Exception} from "./Exception";

export class NotFoundException extends Exception {
    constructor(message: string, level?: $PropertyType<Exception, 'level'>) {
        super(message, level);
        this.name = "NotFoundException";
    }
}


