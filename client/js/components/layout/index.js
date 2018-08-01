import React from 'react';
import Footer from '../footer';
const Fragment = React.Fragment;

export default function layout(props){
    return (
        <Fragment>
            <section className="todoapp">{props.children}</section>
            <Footer/>
        </Fragment>
    );
}