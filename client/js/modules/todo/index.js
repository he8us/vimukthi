import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {hot} from 'react-hot-loader';

import * as Actions from './store/actions'

import Header from './components/Header';
import Footer from './components/Footer';
import TodoList from './components/TodoList';
import Layout from '../../components/Layout';
import ToggleTodo from './components/ToggleTodo';
import {
    getActiveTodoCount,
    getCompletedTodoCount,
    getCurrentFilter,
    getTodosWithFilters,
    TODO_STATUS_ACTIVE,
    TODO_STATUS_ALL,
    TODO_STATUS_COMPLETED
} from "./store/selectors";


const PRESSED_ENTER = 13;

export class Todo extends PureComponent {

    static propTypes = {
        todoList: PropTypes.array.isRequired,
        activeTodoCount: PropTypes.number,
        completedTodoCount: PropTypes.number,
        currentFilter: PropTypes.oneOf([
            TODO_STATUS_ACTIVE,
            TODO_STATUS_COMPLETED,
            TODO_STATUS_ALL
        ]),
        currentEdit: PropTypes.string,
        loadTodos: PropTypes.func.isRequired,
        addTodo: PropTypes.func.isRequired,
        udpateTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        updateCurrentEdit: PropTypes.func.isRequired
    }

    static defaultProps = {
        activeTodoCount: 0,
        completedTodoCount: 0
    }

    state = {
        newTodo: ''
    }

    constructor(props) {
        super(props);

        //Be sure that our listeners "this" context is bound to this
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.onEditSaveHandler = this.onEditSaveHandler.bind(this);
        this.onEditCancelHandler = this.onEditCancelHandler.bind(this);
        this.toggleHandler = this.toggleHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.toggleAllTodosHandler = this.toggleAllTodosHandler.bind(this);
        this.clearCompletedHandler = this.clearCompletedHandler.bind(this);
    }

    componentDidMount() {
        this.props.loadTodos();
    }

    onChangeHandler(event) {
        this.setState({newTodo: event.target.value});
    }

    onSubmitHandler(event) {
        if (event.keyCode !== PRESSED_ENTER) {
            return;
        }

        event.preventDefault();

        const label = this.state.newTodo.trim();

        if (label) {
            this.props.addTodo({
                label,
                completed: false
            });
            this.setState({newTodo: ''});
        }
    }

    onEditHandler(id) {
        this.props.updateCurrentEdit(id);
    }

    onEditSaveHandler(todo, label) {
        const changedTodo = {...todo, label: label};
        this.props.udpateTodo(changedTodo);
    }

    onEditCancelHandler() {
        this.props.updateCurrentEdit(null);
    }

    toggleHandler(todo) {
        const changedTodo = {...todo, completed: !todo.completed};
        this.props.udpateTodo(changedTodo);
    }

    deleteHandler(id) {
        this.props.deleteTodo(id);
    }

    toggleAllTodosHandler(event) {
        const isChecked = event.target.checked;
        this.props.todoList.map(
            todo => {
                if (isChecked !== todo.completed) {
                    const changedTodo = {...todo, completed: isChecked};
                    this.props.udpateTodo(changedTodo);
                }
            }
        )
    }

    clearCompletedHandler() {
        this.props.todoList.map(
            todo => {
                if (todo.completed) {
                    this.props.deleteTodo(todo.id);
                }
            }
        )
    }

    getTodoListFragment() {
        if (
            this.props.activeTodoCount === 0
            && this.props.completedTodoCount === 0
        ) {
            return;
        }

        return <Fragment>
            <section className="main">
                <ToggleTodo
                    activeCount={this.props.activeTodoCount}
                    toggleHander={this.toggleAllTodosHandler}
                />
                <TodoList
                    todoList={this.props.todoList}
                    currentEdit={this.props.currentEdit}
                    onEditHandler={this.onEditHandler}
                    onEditSaveHandler={this.onEditSaveHandler}
                    onEditCancelHandler={this.onEditCancelHandler}
                    toggleHandler={this.toggleHandler}
                    deleteHandler={this.deleteHandler}
                />
            </section>
            <Footer
                activeCount={this.props.activeTodoCount}
                completedCount={this.props.completedTodoCount}
                currentFilter={this.props.currentFilter}
                clearCompleted={this.clearCompletedHandler}
            />
        </Fragment>;
    }

    render() {
        return (
            <Layout>
                <Header
                    handleSubmit={(e) => this.onSubmitHandler(e)}
                    inputValue={this.state.newTodo}
                    inputChanged={(event) => this.onChangeHandler(event)}
                />
                {this.getTodoListFragment()}
            </Layout>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        todoList: getTodosWithFilters(state, props),
        currentFilter: getCurrentFilter(state, props),
        activeTodoCount: getActiveTodoCount(state, props),
        completedTodoCount: getCompletedTodoCount(state, props),
        currentEdit: state.todo.currentEdit
    }
}

export default hot(module)(connect(mapStateToProps, Actions)(Todo));
