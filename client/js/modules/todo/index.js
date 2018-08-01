import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import * as actions from './store/actions'

import Header from './components/header';
import Footer from './components/footer';
import TodoList from './container/todoList';
import Layout from '../../components/layout';
import ToggleTodo from './components/toggleTodo';

const Fragment = React.Fragment;

const PRESSED_ENTER = 13;
const SHOW_TODOS = {
    COMPLETED : "#/completed",
    ACTIVE : "#/active",
    ALL : '#/'
}

export class Todo extends Component {
    
    state = {
        newTodo : '',
        display : SHOW_TODOS.ALL
    }

    onChangeHandler = (event) => {
        this.setState({newTodo: event.target.value});
    }
    onSubmitHandler = (event) => {
        if (event.keyCode !== PRESSED_ENTER) {
            return;
        }

        event.preventDefault();

        const label = this.state.newTodo.trim();

        if (label) {
            this.props.addTodo({
                label,
                completed : false
            });
            this.setState({newTodo: ''});
        }
    }
    onEditHandler = (id) => {
        this.props.updateCurrentEdit(id);
    }
    onEditSaveHandler = (todo,label) => {
        const changedTodo = {...todo,label : label};
        this.props.udpateTodo(changedTodo);
    }
    onEditCancelHandler = () => {
        this.props.updateCurrentEdit(null);
    }
    toggleHandler = (todo) => {
        const changedTodo = {...todo,completed : !todo.completed};
        this.props.udpateTodo(changedTodo);
    }
    deleteHandler = (id) => {
        this.props.deleteTodo(id);
    }
    toggleAllTodosHandler = (event) => {
        const isChecked = event.target.checked;
        this.props.todoList.map(
            todo => {
                if(isChecked !== todo.completed){
                    const changedTodo = {...todo,completed : isChecked};
                    this.props.udpateTodo(changedTodo);
                }
            }
        )
        
    }
    clearCompletedHandler = () => {
        this.props.todoList.map(
            todo => {
                if(todo.completed){
                    this.props.deleteTodo(todo.id);
                }
            }
        )
    }
    componentDidMount(){
        this.props.loadTodos();
    }
    render() {
        const activeTodoCount = this.props.todoList.reduce(function (count, todo) {
            return todo.completed ? count : count + 1;
        }, 0);
        const completedTodoCount = this.props.todoList.length - activeTodoCount;
        const activeLink = this.props.location.hash;
        let appBody = '';
        if(this.props.todoList.length !== 0){
            appBody = 
            <Fragment>
                <section className="main">
                    <ToggleTodo activeCount={activeTodoCount} toggleHander={(event) => this.toggleAllTodosHandler(event)}/>
                    <TodoList
                        todoList={getVisibleTodos(this.props.todoList,activeLink)}
                        currentEdit={this.props.currentEdit}
                        onEditHandler={this.onEditHandler}
                        onEditSaveHandler={this.onEditSaveHandler}
                        onEditCancelHandler={this.onEditCancelHandler}
                        toggleHandler={this.toggleHandler}
                        deleteHandler={this.deleteHandler}/>
                </section>
                <Footer activeCount={activeTodoCount} completedCount={completedTodoCount} todoIdentidiers={SHOW_TODOS} activeLink={activeLink} clearCompleted={this.clearCompletedHandler}/>
            </Fragment>
        }
        return (
            <Fragment>
                <Layout>
                    <Header handleSubmit={this.onSubmitHandler} inputValue={this.state.newTodo} inputChanged={(event) => this.onChangeHandler(event)}/>
                    {appBody}
                </Layout>
            </Fragment>
        );
    }
}

function mapStateToProps(state){
    return {
        todoList : state.todo.todos,
        currentEdit : state.todo.currentEdit
    }
}

function mapDispatchToProps(dispatch){
    return {
        loadTodos           : () => dispatch(actions.loadTodos()),
        addTodo             : (payload) => dispatch(actions.addTodo(payload)),
        udpateTodo          : (payload) => dispatch(actions.udpateTodo(payload)),
        deleteTodo          : (payload) => dispatch(actions.deleteTodo(payload)),
        updateCurrentEdit   : (payload) => dispatch(actions.updateCurrentEdit(payload))
    }
}

function getVisibleTodos(todos, filter){
    switch(filter){
        case SHOW_TODOS.ACTIVE:
            return todos.filter(t => !t.completed);
        case SHOW_TODOS.COMPLETED:
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

Todo.propTypes = {
    todoList : PropTypes.array.isRequired,
    currentEdit : PropTypes.string,
    loadTodos : PropTypes.func.isRequired,
    addTodo : PropTypes.func.isRequired,
    udpateTodo : PropTypes.func.isRequired,
    deleteTodo : PropTypes.func.isRequired,
    updateCurrentEdit : PropTypes.func.isRequired
}
export default connect(mapStateToProps,mapDispatchToProps)(Todo);