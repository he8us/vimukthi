import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {TODO_STATUS_ACTIVE, TODO_STATUS_ALL, TODO_STATUS_COMPLETED} from "../store/selectors";
import {Link} from "react-router-dom";

import {pularize} from '../../../utils/Util';

export default class Footer extends PureComponent {

    static propTypes = {
        activeCount: PropTypes.number.isRequired,
        completedCount: PropTypes.number.isRequired,
        currentFilter: PropTypes.string.isRequired,
        clearCompleted: PropTypes.func.isRequired
    }

    getClearButton() {
        if (this.props.completedCount > 0) {
            return <button onClick={this.props.clearCompleted} className="clear-completed">Clear completed</button>;
        }
    }

    render() {
        let {activeCount, currentFilter} = this.props

        return (
            <footer className="footer">
                <span className="todo-count"><strong>{activeCount}</strong> {pularize(activeCount, 'item')} left</span>
                <ul className="filters">
                    <li>
                        <Link
                            className={(TODO_STATUS_ALL == currentFilter) ? "selected" : ""}
                            to="/"
                        >
                            All
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={(TODO_STATUS_ACTIVE == currentFilter) ? "selected" : ""}
                            to={`/${TODO_STATUS_ACTIVE}`}
                        >
                            Active
                        </Link>

                    </li>
                    <li>
                        <Link
                            className={(TODO_STATUS_COMPLETED == currentFilter) ? "selected" : ""}
                            to={`/${TODO_STATUS_COMPLETED}`}
                        >
                            Completed
                        </Link>
                    </li>
                </ul>
                {this.getClearButton()}
            </footer>
        )
    }
}
