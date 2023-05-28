import './style.css';
import {loadHeader} from './pageLoad';

const content = document.getElementById('content');
content.appendChild(loadHeader());
