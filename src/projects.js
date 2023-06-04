/* eslint-disable require-jsdoc */
import {todo1, todo2} from './todo';

class Project {
  constructor(name, todos = []) {
    this.name = name;
    this.todos = todos;
  }
  addTodo = (todo) => {
    this.todos.push(todo);
  };

  deleteTodo = (todo) => {
    for (let i = 0; i < this.todos.length; i++) {
      if (todo.getTitle() === this.todos[i].getTitle()) {
        this.todos.splice(i, 1);
      }
    }
  };
}
let currentProject = '';
const allProjects = [];

const getCurrentProject = () => {
  return currentProject;
};

const setCurrentProject = (project) => {
  currentProject = project;
};
const inbox = new Project('Inbox');
allProjects.push(inbox);
inbox.addTodo(todo1);
inbox.addTodo(todo2);

currentProject = inbox;

export {allProjects, Project, getCurrentProject, setCurrentProject};
