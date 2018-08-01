// @flow
import config from 'config';
import {TodoRepository} from "./TodoRepository";
import type {StoreInterface} from "../store/StoreInterface";
import {InMemoryStore} from "../store/InMemoryStore";
import {Exception} from "../Errors/Exception";
import {Todo} from "../models/Todo";


const isNode = new Function("try {return this===global;}catch(e){return false;}");

if (!isNode()) {
    throw new Exception('The repository builder is not meant to be used in the browser');
}

export const IN_MEMORY = 'InMemory';


const repositoryType = config.get('server.repository');
let store: StoreInterface<Todo>;

switch (repositoryType) {
    case IN_MEMORY:
        store = new InMemoryStore();
        break;
    default:
        throw new Exception("Unknown requested repository type");
}

export const repository = new TodoRepository(store);
