//Let us test some UI
import {JSDOM} from 'jsdom';

global.window = new JSDOM('<!doctype html><html><body></body></html>');
global.document = window.window;

Object.keys(window).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        global[property] = document.defaultView[property];
    }
});
