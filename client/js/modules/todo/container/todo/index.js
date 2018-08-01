import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;
class Todo extends Component {
    constructor(props){
        super(props);
        this.editRef = React.createRef();
    }
    state = {
        text : ''
    }
    editHandler = () => {
        this.props.onEditHandler();
        this.setState({text : this.props.item.label});
    }
    onChangeHandler = (event) => {
        this.setState({text:event.target.value});
    }
    onSubmitHandler = () => {
        let label = this.state.text.trim();
        if(label) {
            this.props.onEditSaveHandler(label);
        }
    }
    onKeyDownHandler = (event) => {
        if (event.which === ESCAPE_KEY) {
            this.setState({text: this.props.item.label});
            this.props.onEditCancelHandler(event);
        } else if (event.which === ENTER_KEY) {
            this.onSubmitHandler();
        }
    }
    componentDidUpdate(){
        this.editRef.current.focus();
    }
    render() {
        const { item,toggleHandler,deleteHandler,editing } = this.props;
        const className = [];
        if(item.completed){className.push('completed');}
        if(editing){className.push('editing');}
        return (
            <li className={className.join(' ')}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={item.completed} onChange={toggleHandler}/>
                    <label onDoubleClick={this.editHandler}>{item.label}</label>
                    <button className="destroy" onClick={deleteHandler}></button>
                </div>
                <input className="edit"
                    ref={this.editRef}
                    value={this.state.text}
                    onChange={this.onChangeHandler}
                    onBlur={this.onSubmitHandler}
                    onKeyDown={this.onKeyDownHandler}/>
            </li>
        );
    }
}

Todo.propTypes = {
    item : PropTypes.object.isRequired,
    toggleHandler : PropTypes.func.isRequired,
    deleteHandler : PropTypes.func.isRequired,
    editing : PropTypes.bool.isRequired,
    onEditHandler : PropTypes.func.isRequired,
    onEditSaveHandler : PropTypes.func.isRequired,
    onEditCancelHandler : PropTypes.func.isRequired,
}


export default Todo;