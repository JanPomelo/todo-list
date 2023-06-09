/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {isEqual, format, parseISO, nextMonday, compareAsc} from 'date-fns';

class Project {
  constructor(name, todos = []) {
    this.name = name;
    this.todos = todos;
  }
  /*
  addTodo = (todo) => {
    this.todos.push(todo);
  };

  getName = () => {
    return this.name;
  };
  clearTodos = () => {
    this.todos = [];
  };
  deleteTodo = (todo) => {
    if (this.todos.length === 1) {
      this.todos = [];
    } else {
      for (let i = 0; i < this.todos.length; i++) {
        if (todo.getTitle() === this.todos[i].getTitle()) {
          this.todos.splice(i, 1);
        }
      }
    }
  };
  */
}

Project.prototype.addTodo = function(todo) {
  this.todos.push(todo);
};

Project.prototype.getName = function() {
  return this.name;
};

Project.prototype.clearTodos = function() {
  this.todos = [];
};

Project.prototype.deleteTodo = function(todo) {
  if (this.todos.length === 1) {
    this.todos = [];
  } else {
    for (let i = 0; i < this.todos.length; i++) {
      if (todo.getTitle() === this.todos[i].getTitle()) {
        this.todos.splice(i, 1);
      }
    }
  }
};

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


const checkForToday = () => {
  allProjects[0].clearTodos();
  for (let i = 2; i < allProjects.length; i++) {
    for (let j = 0; j < allProjects[i].todos.length; j++) {
      const todayDay = format(new Date(), 'yyyy-MM-dd');
      if (isEqual(parseISO(todayDay), parseISO(allProjects[i].todos[j].getDueDate()))) {
        allProjects[0].addTodo(allProjects[i].todos[j]);
      }
    }
  }
};
/*
const inbox = new Project('Inbox');
const today = new Project('Today');
const thisWeek = new Project('This Week');
addToProjects(today);
addToProjects(thisWeek);
addToProjects(inbox);
setCurrentProject(inbox);
*/

const checkForThisWeek = () => {
  allProjects[1].clearTodos();
  for (let i = 2; i < allProjects.length; i++) {
    for (let j = 0; j < allProjects[i].todos.length; j++) {
      const thisWeekDate = format(nextMonday(parseISO(format(new Date(), 'yyyy-MM-dd'))), 'yyyy-MM-dd');
      if (compareAsc(parseISO(thisWeekDate), parseISO(allProjects[i].todos[j].getDueDate())) != -1) {
        allProjects[1].addTodo(allProjects[i].todos[j]);
        // }
      }
    }
  }
};

// currentProject = inbox;

export {getAllProjects, setAllProjects, addTodoToNewProject, deleteProject, addToProjects, Project, getCurrentProject, setCurrentProject, checkForToday, checkForThisWeek};
