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
  todo.setProject(form.projects.value);
  if (form.description.value != '') {
    todo.setDescription(form.description.value);
  }
  if (form.notes.value != '') {
    todo.setNotes(form.notes.value);
    console.log(todo.getNotes());
  }
  if (form.checklist) {
    if (form.checklist.value != '') {
      todo.setChecklist([form.checklist.value]);
    }
  }
  console.log(todo);
  return todo;
};
const deleteTodoFromProject = (project, todo) => {
  project.deleteTodo(todo);
  loadTodos(project);
};

export {toggleDone, createNewTodo, deleteTodoFromProject};
