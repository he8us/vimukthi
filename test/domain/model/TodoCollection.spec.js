// @flow
import {expect} from 'chai';
import {Todo} from "../../../domain/models/Todo";
import {TodoCollection} from "../../../domain/models/TodoCollection";

describe('Domain/Model/TodoCollection', () => {

    describe('constructor', () => {
        it('should be able to be instancied', () => {

            let collection = new TodoCollection();

            expect(collection._store).to.have.length(0);
            expect(collection).to.be.an.instanceof(TodoCollection);
        });

        it('should be able to receive a list of todo at creation', () => {
            let todos = [
                Todo.create('Hello'),
                Todo.create('World')
            ];

            let collection = new TodoCollection(todos);

            expect(collection._store).to.have.length(2);
            expect(collection._store[0]).to.be.deep.equal(todos[0]);
            expect(collection._store[1]).to.be.deep.equal(todos[1]);
        });

        it('should be able to receive a list of JSON serialized todos at creation', () => {
            let todos = [
                Todo.create('Hello'),
                Todo.create('World')
            ];

            // $FlowFixMe
            let collection = new TodoCollection([
                todos[0].toJSON(),
                todos[1].toJSON()
            ]);

            expect(collection._store).to.have.length(2);
            expect(collection._store[0]).to.be.deep.equal(todos[0]);
            expect(collection._store[1]).to.be.deep.equal(todos[1]);
        });
    });


    describe('toJSON', () => {
        it('should return a JSON representation of the collection and the todos', () => {

            let todos: Array<Todo> = [
                Todo.create('Hello world'),
                Todo.create('Say hello', true)
            ];

            // $FlowFixMe
            let collection = new TodoCollection(todos);


            let serialized = collection.toJSON();

            expect(serialized).to.be.an('array');
            expect(serialized).to.have.length(2);
            expect(serialized[0]).to.be.deep.equal(todos[0].toJSON());
            expect(serialized[1]).to.be.deep.equal(todos[1].toJSON());
        });
    });

});
