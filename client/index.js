import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Todo from './js/modules/todo';
import store from './js/store';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import 'todomvc-app-css/index.css';
import './css/app.css';

ReactDOM.render(<Provider store={store}><Router><Route path="/" component={Todo}/></Router></Provider>, document.getElementById('root'));