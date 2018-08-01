// @flow
import type {Response} from "@types/node";
import type {ResponseInterface} from "../models/ResponseInterface";
import {Exception} from "../../domain/Errors/Exception";
import {ErrorResponse} from "../models/ErrorResponse";
import {NotFoundException} from "../../domain/Errors/NotFoundException";

export const sendResponse = (res: Response, response: ResponseInterface): Promise<any> => {
    return res.status(response.getCode()).json(response);
};


export const createErrorResponseFromException = (e: Exception): ErrorResponse => {

    let code: number = (e instanceof NotFoundException) ? 404 : 400;
    return new ErrorResponse(e.message, code);
};
