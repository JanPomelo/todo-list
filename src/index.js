'use strict';

import './style.css';
import {loadPage} from './pageLoad';

const body = document.getElementById('body');
body.appendChild(loadPage());
