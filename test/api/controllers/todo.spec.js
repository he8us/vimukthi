// @flow
import request from 'supertest';
import {expect} from 'chai';
import server from '../../mocks/apiServer.js';
import {Todo} from "../../../domain/models/Todo";
import {repository} from "../../../domain/repository";


describe('Api/Controllers/todo', () => {
    beforeEach(() => {
        return repository.clear();
    });

    describe('/todo', () => {

        describe('GET', () => {
            it('should return an empty list of todo', async () => {
                let response = await request(server)
                    .get('/api/todo')
                    .expect(200)
                    .expect('Content-Type', /json/);

                expect(response.body).to.have.length(0);
                return;
            });

            it('should return a list of todos', async () => {
                await repository.add(Todo.create("Something to do"));
                await repository.add(Todo.create("Something already done", true));

                let response = await request(server)
                    .get('/api/todo')
                    .expect(200)
                    .expect('Content-Type', /json/);

                expect(response.body).to.have.length(2);
                expect(response.body[0]).to.have.property('label', "Something to do");
                expect(response.body[0]).to.have.property('completed', false);
                expect(response.body[1]).to.have.property('label', "Something already done");
                expect(response.body[1]).to.have.property('completed', true);

                return;
            });
        });

        describe('POST', () => {
            it('should return the created todo with it\'s ID', async () => {
                let response = await request(server)
                    .post('/api/todo')
                    .send({
                        label: "Some todo label"
                    })
                    .expect(200)
                    .expect('Content-Type', /json/);

                expect(response.body).to.have.property("id");
                expect(response.body).to.have.property("label", "Some todo label");
                expect(response.body).to.have.property("completed", false);

                return;
            });

            it('should return a 400 if the label is missing', async () => {
                let response = await request(server)
                    .post('/api/todo')
                    .send({
                        completed: true
                    })
                    .expect(400)
                    .expect('Content-Type', /json/);

                expect(response.body).to.have.property('message');
                return;
            });

            it('should return a 400 if the label is empty', async () => {
                let response = await request(server)
                    .post('/api/todo')
                    .send({
                        label: ""
                    })
                    .expect(400)
                    .expect('Content-Type', /json/);

                expect(response.body).to.have.property('message');
                return;
            });

            it('should return a new ID if the POST\'ed todo already has one', async () => {
                let todo = Todo.create('Some todo');

                let response = await request(server)
                    .post('/api/todo')
                    .send(todo.toJSON())
                    .expect(200)
                    .expect('Content-Type', /json/);

                expect(response.body.id).to.be.not.equal(todo.getId());
                expect(response.body.label).to.be.equal(todo.getLabel());
                expect(response.body.completed).to.be.equal(todo.isCompleted());
                return;
            });

        });
    });


    describe('/todo/{id}', () => {
        describe('GET', () => {
            it('should return a single Todo', async () => {
                let todo = Todo.create('Some thing to do');
                await repository.add(todo);

                let response = await request(server)
                    .get(`/api/todo/${todo.getId()}`)
                    .expect(200)
                    .expect('Content-Type', /json/);

                expect(response.body).to.be.deep.equal(todo.toJSON());

                return;
            });

            it('should return an error if the todo is not found', () => {
                return request(server)
                    .get("/api/todo/some-undefined-id")
                    .expect(404)
                    .expect('Content-Type', /json/);
            });
        });

        describe('POST', () => {
            it('should return an error', () => {
                return request(server)
                    .post("/api/todo/some-undefined-id")
                    .expect(405);
            });
        });

        describe('PUT', () => {
            it('should update a todo', async () => {
                let todo = Todo.create('Learn Promises');

                await repository.add(todo);

                let response = await request(server)
                    .put(`/api/todo/${todo.getId()}`)
                    .send({
                        label: "Learn ES6",
                        completed: true
                    })
                    .expect(200)
                    .expect('Content-Type', /json/);

                expect(response.body).to.have.property('label', 'Learn ES6');
                expect(response.body).to.have.property('completed', true);

                // $FlowFixMe
                let updatedTodo = await repository.getById(todo.getId());

                expect(updatedTodo.getLabel()).to.be.equal('Learn ES6');
                expect(updatedTodo.isCompleted()).to.be.true;

                return;
            });

            describe('handling partial updates', () => {
                it('should update a todo with just a label', async () => {
                    let todo = Todo.create('Some todo');

                    await repository.add(todo);

                    let response = await request(server)
                        .put(`/api/todo/${todo.getId()}`)
                        .send({
                            label: "Learn Promises"
                        })
                        .expect(200)
                        .expect('Content-Type', /json/);

                    expect(response.body).to.have.property('label', 'Learn Promises');
                    expect(response.body).to.have.property('completed', false);

                    // $FlowFixMe
                    let updatedTodo = await repository.getById(todo.getId());

                    expect(updatedTodo.getLabel()).to.be.equal('Learn Promises');
                    expect(updatedTodo.isCompleted()).to.be.false;

                    return;
                });

                it('should complete a todo with just the completed flag', async () => {
                    let todo = Todo.create("Learn Promises");

                    await repository.add(todo);

                    let response = await request(server)
                        .put(`/api/todo/${todo.getId()}`)
                        .send({
                            completed: true
                        })
                        .expect(200)
                        .expect('Content-Type', /json/);

                    expect(response.body).to.have.property('label', 'Learn Promises');
                    expect(response.body).to.have.property('completed', true);

                    // $FlowFixMe
                    let updatedTodo = await repository.getById(todo.getId());

                    expect(updatedTodo.getLabel()).to.be.equal('Learn Promises');
                    expect(updatedTodo.isCompleted()).to.be.true;

                    return;
                });

                it('should activate a todo with just the completed flag', async () => {
                    let todo = Todo.create('Learn Promises', true);

                    await repository.add(todo);

                    let response = await request(server)
                        .put(`/api/todo/${todo.getId()}`)
                        .send({
                            completed: false
                        })
                        .expect(200)
                        .expect('Content-Type', /json/);

                    expect(response.body).to.have.property('label', 'Learn Promises');
                    expect(response.body).to.have.property('completed', false);

                    // $FlowFixMe
                    let updatedTodo = await repository.getById(todo.getId());

                    expect(updatedTodo.getLabel()).to.be.equal('Learn Promises');
                    expect(updatedTodo.isCompleted()).to.be.false;

                    return;
                });
            });

            it('should return an error if the todo is not found', () => {
                return request(server)
                    .put("/api/todo/some-undefined-id")
                    .send({
                        label: "Create a new todo",
                        completed: true
                    })
                    .expect(404)
                    .expect('Content-Type', /json/);
            });
        });

        describe('DELETE', () => {
            it('should return an error if the todo is not found', () => {
                return request(server)
                    .delete("/api/todo/some-undefined-id")
                    .expect(404)
                    .expect('Content-Type', /json/);
            });
            it('should delete a todo', async () => {
                let todo = Todo.create('Delete that!');

                await repository.add(todo);

                await request(server)
                    .delete(`/api/todo/${todo.getId()}`)
                    .expect(200)
                    .expect('Content-Type', /json/);


                todo = await repository.getById(todo.getId());

                expect(todo).to.be.undefined;

                return;
            });

        });
    });
});
