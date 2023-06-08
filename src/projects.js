/* eslint-disable max-len */
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

  getName = () => {
    return this.name;
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
let allProjects = [];

const addTodoToNewProject = (todo, projectName) => {
  for (let i = 0; i < allProjects.length; i++) {
    if (projectName === allProjects[i].getName()) {
      allProjects[i].todos.push(todo);
    }
  }
  console.log(allProjects);
};

const getCurrentProject = () => {
  return currentProject;
};

const setCurrentProject = (project) => {
  currentProject = project;
};

const addToProjects = (project) => {
  allProjects.push(project);
};

const getAllProjects = () => {
  return allProjects;
};
const setAllProjects = (newProjects) => {
  allProjects = newProjects;
};
const deleteProject = (project) => {
  for (let i = project.todos.length -1; i >= 0; i--) {
    delete project.todos[i];
  }
  for (let i = allProjects.length -1; i >= 0; i--) {
    if (project.getName() === allProjects[i].getName()) {
      allProjects.splice(i, 1);
    }
  }
};

const inbox = new Project('Inbox');
const today = new Project('Today');
const thisWeek = new Project('This Week');
allProjects.push(today);
allProjects.push(thisWeek);
allProjects.push(inbox);
inbox.addTodo(todo1);
inbox.addTodo(todo2);

currentProject = inbox;

export {getAllProjects, setAllProjects, addTodoToNewProject, deleteProject, addToProjects, Project, getCurrentProject, setCurrentProject};
