import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import MainFooter from './MainFooter';

export default class Layout extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(
                PropTypes.element
            )
        ]).isRequired
    }

    render() {
        return (
            <Fragment>
                <section className="todoapp">
                    {this.props.children}
                </section>
                <MainFooter/>
            </Fragment>
        );
    }
}

