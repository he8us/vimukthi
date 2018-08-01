// @flow
import {expect} from 'chai';
import {Todo} from "../../../domain/models/Todo";
import {TodoListResponse} from "../../../api/models/TodoListResponse";
import {TodoCollection} from "../../../domain/models/TodoCollection";


describe('Api/Model/TodoListResponse', () => {
    describe('constructor', () => {
        it('should receive a TodoCollection at instantiation', () => {
            let todo = Todo.create('Something to do.');
            let collection = new TodoCollection([
                todo
            ]);

            let response = new TodoListResponse(collection);

            expect(response._collection).to.equal(collection);
        });
    });

    describe('toJSON', () => {
        it('should return the serialized TodoCollection', () => {

            let todo = Todo.create('Something to do.');
            let collection = new TodoCollection([
                todo
            ]);

            let response = new TodoListResponse(collection);

            expect(response.toJSON()).to.be.deep.equal(collection.toJSON());
        });
    });
});
