import React from 'react';

export default function header(props){
    return (
        <header className="header">
            <h1>todos</h1>
            <input className="new-todo" placeholder="What needs to be done?" value={props.inputValue} onChange={props.inputChanged} onKeyDown={props.handleSubmit} autoFocus/>
        </header>
    )
}