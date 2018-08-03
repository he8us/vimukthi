import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

export default class TodoList extends PureComponent {
    static propTypes = {
        todoList: PropTypes.array.isRequired,
        onEditHandler: PropTypes.func.isRequired,
        onEditSaveHandler: PropTypes.func.isRequired,
        onEditCancelHandler: PropTypes.func.isRequired,
        toggleHandler: PropTypes.func.isRequired,
        deleteHandler: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const sorted_list = [...this.props.todoList]
        return (
            <ul className="todo-list">
                {sorted_list.reverse().map(
                    todo => (
                        <Todo
                            item={todo}
                            key={todo.id}
                            editing={this.props.currentEdit === todo.id}
                            toggleHandler={() => this.props.toggleHandler(todo)}
                            onEditHandler={() => this.props.onEditHandler(todo.id)}
                            onEditSaveHandler={(label) => this.props.onEditSaveHandler(todo, label)}
                            onEditCancelHandler={() => this.props.onEditCancelHandler(todo.id)}
                            deleteHandler={() => this.props.deleteHandler(todo.id)}/>
                    )
                )}
            </ul>
        );
    }
}
