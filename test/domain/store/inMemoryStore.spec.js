// @flow
import {InMemoryStore} from "../../../domain/store/InMemoryStore";
import {Todo} from "../../../domain/models/Todo";
import {expect} from "chai";
import {Exception} from "../../../domain/Errors/Exception";

describe('Domain/Store', () => {
    describe('InMemoryStore', () => {
        let store;

        beforeEach(() => {
            store = new InMemoryStore();
        });

        describe('add', () => {
            it("should be able to add a todo", async () => {
                let todo = Todo.create('Some new idea');

                await store.add(todo);

                return expect(store._store[0]).to.be.deep.equal(todo);
            });

            it("should be able to add multiple todos", async () => {
                let todos = [
                    Todo.create('Become the master of the universe'),
                    Todo.create('Be a Javascript Ninja', true)
                ];

                await store.add(todos);

                expect(store._store[0]).to.be.deep.equal(todos[0]);
                return expect(store._store[1]).to.be.deep.equal(todos[1]);
            });

            it("should throw an Exception if the array is empty", () => {
                let todos = [];

                return store.add(todos).catch((err) => {
                    expect(err).to.be.an.instanceof(Exception);
                });
            });
        });

        describe('save', () => {
            it('should be able to save the modified todo', async () => {
                let todo = Todo.create('Find some other todos');

                await store.add(todo);

                expect(store._store[0].isCompleted()).to.be.false;

                todo = todo.complete();

                await store.save(todo);

                expect(store._store[0].getId()).to.be.equal(todo.getId());
                return expect(store._store[0].isCompleted()).to.be.true;
            });
        });

        describe('clear', () => {
            it('should be able to empty the store', async () => {
                let todo = Todo.create('I have difficulties to find new labels');

                await store.add(todo);

                expect(store._store).to.have.length(1);
                expect(store._store[0]).to.be.deep.equal(todo);

                await store.clear();
                return expect(store._store).to.have.length(0);
            });
        });

        describe('delete', () => {
            it('should delete the given todo from the store', async () => {
                let todo = Todo.create('Implement the delete', true);

                await store.add(todo);

                expect(store._store[0]).to.be.deep.equal(todo);

                let response = await store.delete(todo);

                expect(response).to.be.true;
                return expect(store._store).to.have.length(0);
            });
        });

        describe('findAll', () => {
            it('should return the complete store', async () => {
                let todos = [
                    Todo.create("Say hello", true),
                    Todo.create("Say goodbye")
                ];

                await store.add(todos);

                let storage = await store.findAll();

                expect(todos).to.be.deep.equal(storage);
                return;
            });
        });

        describe('findById', () => {
            it('should return a single Todo based on it\'s ID', async () => {
                let todos = [
                    Todo.create('Something to do!'),
                    Todo.create('An other thing to do...'),
                    Todo.create('Go home and enjoy the weekend')
                ];

                await store.add(todos);

                let requestedTodo = await store.findById(todos[1].getId());

                expect(requestedTodo).to.be.deep.equal(todos[1]);
                return;
            });
        });

        describe('findByField', () => {
            it('should return a list of Todo based on it\'s label', async () => {
                let todos = [
                    Todo.create('Something to do!', true),
                    Todo.create('An other thing to do...'),
                    Todo.create('Go home and enjoy the weekend')
                ];

                await store.add(todos);

                let requestedTodos = await store.findByField(Todo.FIELD_LABEL, todos[2].getLabel());
                expect(requestedTodos).to.be.an('array');
                expect(requestedTodos).to.have.length(1);
                expect(requestedTodos[0]).to.be.deep.equal(todos[2]);
                return;
            });

            it('should return a list Todo based on it\'s completed status', async () => {
                let todos = [
                    Todo.create('Something to do!', true),
                    Todo.create('An other thing to do...'),
                    Todo.create('Go home and enjoy the weekend')
                ];

                await store.add(todos);

                let requestedTodos = await store.findByField(Todo.FIELD_COMPLETED, true);
                expect(requestedTodos).to.be.an('array');
                expect(requestedTodos).to.be.have.length(1);
                expect(requestedTodos[0]).to.be.deep.equal(todos[0]);

                requestedTodos = await store.findByField(Todo.FIELD_COMPLETED, false);
                expect(requestedTodos).to.be.an('array');
                expect(requestedTodos).to.be.have.length(2);
                expect(requestedTodos[0]).to.be.deep.equal(todos[1]);
                expect(requestedTodos[1]).to.be.deep.equal(todos[2]);
                return;
            });

            it('should return an empty array if nothing is found', async () => {
                let todos = [
                    Todo.create('Something to do!'),
                    Todo.create('An other thing to do...'),
                    Todo.create('Go home and enjoy the weekend')
                ];

                await store.add(todos);

                let requestedTodos = await store.findByField(Todo.FIELD_COMPLETED, true);
                expect(requestedTodos).to.be.an('array');
                expect(requestedTodos).to.be.have.length(0);

                requestedTodos = await store.findByField(Todo.FIELD_LABEL, "Blah blah");
                expect(requestedTodos).to.be.an('array');
                expect(requestedTodos).to.be.have.length(0);
                return;
            });
        });
    });
});
