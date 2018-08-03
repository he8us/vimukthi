import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class ToggleTodo extends PureComponent {
    static propTypes = {
        activeCount: PropTypes.number,
        toggleHander: PropTypes.func.isRequired
    }

    static defaultProps = {
        activeCount: 0
    }

    render() {
        return (
            <Fragment>
                <input
                    id="toggle-all"
                    className="toggle-all"
                    type="checkbox"
                    onChange={this.props.toggleHander}
                    checked={(this.props.activeCount === 0)}
                />

                <label htmlFor="toggle-all">Mark all as complete</label>
            </Fragment>
        )
    }
}
