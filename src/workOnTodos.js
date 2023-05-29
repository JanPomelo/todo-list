'use strict';
import {loadTodos} from './pageLoad';
import {inbox} from './projects';

const toggleDone = (todo) => {
  const done = todo.getDone();
  if (done) {
    todo.setDone(false);
  } else {
    todo.setDone(true);
  }
  loadTodos(inbox);
};

export {toggleDone};
