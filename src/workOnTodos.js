/* eslint-disable max-len */
'use strict';
import {loadTodos} from './pageLoad';
import {Todo} from './todo';


const toggleDone = (project, todo) => {
  const done = todo.getDone();
  if (done) {
    todo.setDone(false);
  } else {
    todo.setDone(true);
  }
  loadTodos(project);
};

const createNewTodo = () => {
  const form = document.getElementById('addTodoForm');
  const todo = new Todo(form.title.value, form.dueDate.value, form.priorities.value);
  return todo;
};
const deleteTodoFromProject = (project, todo) => {
  project.deleteTodo(todo);
  loadTodos(project);
};

export {toggleDone, createNewTodo, deleteTodoFromProject};
