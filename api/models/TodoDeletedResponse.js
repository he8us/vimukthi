// @flow
import {AbstractSuccessResponse} from "./AbstractSuccessResponse";

export class TodoDeletedResponse extends AbstractSuccessResponse {
    toJSON() {
        return {
            message: 'Successfully deleted the Todo'
        };
    }
}
