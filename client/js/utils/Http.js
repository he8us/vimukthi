/* eslint-disable no-console */
import axios from 'axios';

const API_URL = `http://localhost:3000/api/`;

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export default axios;
