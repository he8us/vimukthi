import React from 'react';
import PropTypes from 'prop-types';

import {pularize} from '../../../../utils/Util';

const footer = ({activeCount,todoIdentidiers,activeLink,completedCount,clearCompleted}) => {
    const clearButton = (completedCount > 0) ? <button onClick={clearCompleted} className="clear-completed">Clear completed</button> : "";
    return (
        <footer className="footer">
            <span className="todo-count"><strong>{activeCount}</strong> {pularize(activeCount,'item')} left</span>
            <ul className="filters">
                <li>
                    <a className={(todoIdentidiers.ALL == activeLink )? "selected" : ""} href="#/">All</a>
                </li>
                <li>
                    <a className={(todoIdentidiers.ACTIVE == activeLink )? "selected" : ""} href="#/active">Active</a>
                </li>
                <li>
                    <a className={(todoIdentidiers.COMPLETED == activeLink )? "selected" : ""} href="#/completed">Completed</a>
                </li>
            </ul>
            {clearButton}
        </footer>
    )
}

footer.propTypes = {
    activeCount : PropTypes.number.isRequired,
    completedCount : PropTypes.number.isRequired,
    todoIdentidiers : PropTypes.object.isRequired,
    activeLink : PropTypes.string.isRequired,
    clearCompleted : PropTypes.func.isRequired
}
export default footer;