'use strict';
import {loadTodos} from './pageLoad';
import {inbox} from './projects';
import {reallySure} from './domManips';

const toggleDone = (todo) => {
  const done = todo.getDone();
  if (done) {
    todo.setDone(false);
  } else {
    todo.setDone(true);
  }
  loadTodos(inbox);
};

const deleteTodo = () => {
  if (reallySure()) {
  }
};

export {toggleDone, deleteTodo};
