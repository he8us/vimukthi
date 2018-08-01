// @flow
import type {Response} from "@types/node";
import type {SwaggerRequest} from "../../server/api/SwaggerMiddleware";
import {Todo} from '../../domain/models/Todo';
import {TodoCreatedResponse} from "../models/TodoCreatedResponse";
import {createErrorResponseFromException, sendResponse} from "../helpers/responses";
import type {ResponseInterface} from "../models/ResponseInterface";
import {TodoListResponse} from "../models/TodoListResponse";
import {repository} from "../../domain/repository";
import {TodoDetailsResponse} from "../models/TodoDetailsResponse";
import {NotFoundException} from "../../domain/Errors/NotFoundException";
import {Exception} from "../../domain/Errors/Exception";
import {TodoUpdatedResponse} from "../models/TodoUpdatedResponse";
import {TodoDeletedResponse} from "../models/TodoDeletedResponse";

export const list = async (req: SwaggerRequest, res: Response): Promise<any> => {
    let response: ResponseInterface;
    try {
        let collection = await repository.getAll();
        response = new TodoListResponse(collection);
    }
    catch (e) {
        response = createErrorResponseFromException(e);
    }

    return sendResponse(res, response);
};

export const createTodo = async (req: SwaggerRequest, res: Response): Promise<any> => {
    let {label, completed} = req.swagger.params.body.value;

    let response: ResponseInterface;

    try {
        let todo = Todo.create(label, completed);
        await repository.add(todo);
        response = new TodoCreatedResponse(todo);
    }
    catch (e) {
        response = createErrorResponseFromException(e);
    }

    return sendResponse(res, response);
};


export const getById = async (req: SwaggerRequest, res: Response): Promise<any> => {
    let id: string = req.swagger.params.id.value;


    let response: ResponseInterface;

    try {
        let todo = await repository.getById(id);

        if (todo === undefined) {
            throw new NotFoundException('Todo not found');
        }
        response = new TodoDetailsResponse(todo);
    }
    catch (e) {
        response = createErrorResponseFromException(e);
    }

    return sendResponse(res, response);
};


export const updateTodo = async (req: SwaggerRequest, res: Response): Promise<any> => {
    let id: string = req.swagger.params.id.value;

    let response: ResponseInterface;
    try {
        let todo = await repository.update({
            id,
            label: req.swagger.params.body.value.label,
            completed: req.swagger.params.body.value.completed,
        });

        response = new TodoUpdatedResponse(todo);
    }
    catch (e) {
        response = createErrorResponseFromException(e);
    }

    return sendResponse(res, response);
};


export const deleteTodo = async (req: SwaggerRequest, res: Response): Promise<any> => {
    let id: string = req.swagger.params.id.value;
    let response: ResponseInterface;
    try {
        let deleted = await repository.delete(id);
        if (!deleted) {
            throw new Exception('Problem while saving');
        }

        response = new TodoDeletedResponse();

    }
    catch (e) {
        response = createErrorResponseFromException(e);
    }

    return sendResponse(res, response);
};

