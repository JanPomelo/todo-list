import './style.css';
import {loadPage} from './pageLoad';
import {logTodo1} from './todo';

const body = document.getElementById('body');
body.appendChild(loadPage());
logTodo1();
