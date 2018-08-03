import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import Todo from './js/modules/todo';
import store from './js/store';
import {HashRouter as Router, Route} from "react-router-dom";

import './css/app.css';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/:status?" component={Todo}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
