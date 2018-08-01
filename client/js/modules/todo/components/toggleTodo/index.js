import React from 'react';
import PropTypes from 'prop-types';

const Fragment = React.Fragment;

const toggleTodo = ({activeCount,toggleHander}) => {
    return (
        <Fragment>
            <input id="toggle-all" className="toggle-all" type="checkbox" onChange={toggleHander} checked={(activeCount === 0)}/>
            <label htmlFor="toggle-all">Mark all as complete</label>
        </Fragment>
    )
}

toggleTodo.propTypes = {
    activeCount : PropTypes.number.isRequired,
    toggleHander : PropTypes.func.isRequired
}

export default toggleTodo;