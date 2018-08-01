// @flow
import type {TodoJSONImport} from "../../../domain/models/Todo";
import {Todo} from "../../../domain/models/Todo";
import {expect} from "chai";
import uuid from "uuid/v1";
import {ParameterValidationException} from "../../../domain/Errors/ParameterValidationException";
import {Exception} from "../../../domain/Errors/Exception";


describe('Domain/Models/Todo', () => {

    describe('static create', () => {
        it('should be able to create a new todo with just a label', () => {
            let todo = Todo.create("My Todo");

            expect(todo.getLabel()).to.equal("My Todo");
            expect(todo.getId()).to.not.be.a.string;
            expect(todo.getId()).to.not.be.empty;
            expect(todo.isCompleted()).to.be.false;
        });

        it('should be able to create a new todo with a label and a completed status', () => {
            let todo = Todo.create("My Todo", true);

            expect(todo.getLabel()).to.equal("My Todo");
            expect(todo.getId()).to.not.be.a.string;
            expect(todo.getId()).to.not.be.empty;
            expect(todo.isCompleted()).to.be.true;
        });

        it('should throw an exception if the label is missing or empty', () => {
            expect(() => {
                // $FlowFixMe
                Todo.create();
            }).to.throw(ParameterValidationException);

            expect(() => {
                Todo.create("");
            }).to.throw(ParameterValidationException);

        });

    });

    describe('static fromJSON', () => {
        it('should be able to create a ToDo from a JSON with just a label', () => {
            let json: TodoJSONImport = {
                label: 'Write the ToDo UI'
            };

            let todo = Todo.fromJSON(json);

            expect(todo.getLabel()).to.be.equal(json.label);
            expect(todo.isCompleted()).to.be.false;
        });

        it('should be able to create a ToDo from a JSON with a label and a completed status', () => {
            let json: TodoJSONImport = {
                label: 'Write a todo server',
                completed: true
            };

            let todo = Todo.fromJSON(json);

            expect(todo.getLabel()).to.be.equal(json.label);
            expect(todo.isCompleted()).to.be.true;
        });

        it('should be able to create a ToDo from a JSON with an ID, a label and a completed status', () => {
            let json: TodoJSONImport = {
                id: uuid(),
                label: 'Write the tests for the server',
                completed: true
            };

            let todo = Todo.fromJSON(json);

            expect(todo.getId()).to.be.equal(json.id);
            expect(todo.getLabel()).to.be.equal(json.label);
            expect(todo.isCompleted()).to.be.true;
        });
    });

    describe('static fromString', () => {
        it('should be able to create a ToDo from a string with just a label', () => {
            let str = '{"label": "Let\'s create some todos"}';

            let todo = Todo.fromString(str);

            expect(todo.getLabel()).to.be.equal("Let's create some todos");
            expect(todo.isCompleted()).to.be.false;
        });

        it('should be able to create a ToDo from a string with a label and a status', () => {
            let str = '{"label": "Yet another todo label", "completed": true}';

            let todo = Todo.fromString(str);

            expect(todo.getLabel()).to.be.equal("Yet another todo label");
            expect(todo.isCompleted()).to.be.true;
        });

        it('should be able to create a ToDo from a string with a label and a status', () => {
            let id = uuid();
            let str = `{"id": "${id}" , "label": "YATL", "completed": true}`;

            let todo = Todo.fromString(str);

            expect(todo.getId()).to.be.equal(id);
            expect(todo.getLabel()).to.be.equal("YATL");
            expect(todo.isCompleted()).to.be.true;
        });

        it('should throw an exception if the string is malformed', () => {

            let str = '{ , "label": "YATL", "completed": true';

            expect(() => {
                Todo.fromString(str);
            }).to.throw(ParameterValidationException);
        });
    });

    describe('constructor', () => {
        it("should throw an expection id the ID is not defined", () => {
            expect(() => {
                // $FlowFixMe
                new Todo(undefined, "hello");
            }).to.throw(Exception);
        });
    });

    describe('getLabel', () => {
        it('should return the label', () => {
            let todo = Todo.create('Some new label');
            expect(todo.getLabel()).to.equal('Some new label');
        });
    });

    describe('setLabel', () => {
        it('should change the label', () => {
            let todo = Todo.create('This is a new thing todo');
            expect(todo.getLabel()).to.equal('This is a new thing todo');

            todo = todo.setLabel('That\'s the new label');

            expect(todo.getLabel()).to.equal('That\'s the new label');
        });

        it('should be immutable', () => {
            let todo = Todo.create('This is a new thing todo');
            expect(todo.getLabel()).to.equal('This is a new thing todo');

            todo.setLabel('That\'s the new label');

            expect(todo.getLabel()).to.equal('This is a new thing todo');
        });

        it('should validate the label', () => {
            let todo = Todo.create('This is a new thing todo');
            expect(todo.getLabel()).to.equal('This is a new thing todo');

            expect(() => {
                todo.setLabel('');
            }).to.throw(Exception);
        });
    });

    describe('isComplete', () => {
        it('should return the complete status', () => {
            let todo = Todo.create('Some other new label');
            expect(todo.isCompleted()).to.be.false;

            todo = Todo.create('Yet another new label', true);
            expect(todo.isCompleted()).to.be.true;
        });
    });

    describe('complete', () => {
        it('should change the completed status to true', () => {
            let todo = Todo.create('Some other new label');
            expect(todo.isCompleted()).to.be.false;

            todo = todo.complete();
            expect(todo.isCompleted()).to.be.true;
        });

        it('should be immutable', () => {
            let todo = Todo.create('Some other new label');
            expect(todo.isCompleted()).to.be.false;

            todo.complete();
            expect(todo.isCompleted()).to.be.false;
        });
    });
    describe('activate', () => {
        it('should change the completed status to false', () => {
            let todo = Todo.create('Some other new label', true);
            expect(todo.isCompleted()).to.be.true;

            todo = todo.activate();
            expect(todo.isCompleted()).to.be.false;
        });

        it('should be immutable', () => {
            let todo = Todo.create('Some other new label', true);
            expect(todo.isCompleted()).to.be.true;

            todo.activate();
            expect(todo.isCompleted()).to.be.true;
        });
    });


    describe('toJSON', () => {
        it('should be able to serialize a todo to JSON', () => {
            let todo = Todo.create("Learn ES6 new features", true);

            let json = todo.toJSON();

            expect(json).to.have.property('id', todo.getId());
            expect(json).to.have.property('label', todo.getLabel());
            expect(json).to.have.property('completed', todo.isCompleted());
        });
    });

    describe('toString', () => {
        it('should be able to serialize a todo to a string', () => {
            let todo = Todo.create("Find new things to do", true);
            let str = todo.toString();
            expect(str).to.have.string('"label":"Find new things to do"');
            expect(str).to.have.string('"completed":true');
        });
    });
});
