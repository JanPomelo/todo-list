'use strict';
import {loadTodos} from './pageLoad';

const toggleDone = (project, todo) => {
  const done = todo.getDone();
  if (done) {
    todo.setDone(false);
  } else {
    todo.setDone(true);
  }
  loadTodos(project);
};

const deleteTodoFromProject = (project, todo) => {
  for (let i = 0; i < project.todos.length; i++) {
    if (project.todos[i].getTitle() === todo.getTitle()) {
      project.todos.splice(i, 1);
    }
  }
  loadTodos(project);
};

export {toggleDone, deleteTodoFromProject};
