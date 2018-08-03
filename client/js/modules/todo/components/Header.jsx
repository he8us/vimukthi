import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class Header extends PureComponent {
    static propTypes = {
        inputChanged: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        inputValue: PropTypes.string
    }

    static defaultProps = {
        inputValue: ''
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    value={this.props.inputValue}
                    onChange={this.props.inputChanged}
                    onKeyDown={this.props.handleSubmit}
                    autoFocus
                />
            </header>
        )
    }
}
