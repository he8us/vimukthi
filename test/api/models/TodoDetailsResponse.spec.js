// @flow
import {expect} from 'chai';
import {TodoDetailsResponse} from "../../../api/models/TodoDetailsResponse";
import {Todo} from "../../../domain/models/Todo";

describe('Api/Model/TodoDetailsResponse', () => {
    describe('constructor', () => {
        it('should receive a Todo at instantiation', () => {
            let todo = Todo.create('Something to do.');
            let response = new TodoDetailsResponse(todo);

            expect(response._todo).to.equal(todo);
        });
    });

    describe('toJSON', () => {
        it('should return the serialized Todo', () => {

            let todo = Todo.create('Blah blah');

            let response = new TodoDetailsResponse(todo);

            expect(response.toJSON()).to.be.deep.equal(todo.toJSON());
        });
    });
});
