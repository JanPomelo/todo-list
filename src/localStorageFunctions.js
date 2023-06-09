/* eslint-disable max-len */
'use strict';

import {setAllProjects, getAllProjects, getCurrentProject, setCurrentProject, addToProjects, Project} from './projects';
import {Todo} from './todo';

const saveProjects2Storage = () => {
  const allProjects = getAllProjects();
  localStorage.setItem('projects', JSON.stringify(allProjects));
  localStorage.setItem('curProject', JSON.stringify(getCurrentProject()));
};

const loadProjectsFromStorage = () => {
  const projects = JSON.parse(localStorage.getItem('projects'));
  let curProject = JSON.parse(localStorage.getItem('curProject'));
  // console.log(curProject);
  // console.log(projects);
  for (let i = 0; i < projects.length; i++) {
    projects[i].addTodo = Project.prototype.addTodo;
    projects[i].getName = Project.prototype.getName;
    projects[i].clearTodos = Project.prototype.clearTodos;
    projects[i].deleteTodo = Project.prototype.deleteTodo;
    for (let j = 0; j < projects[i].todos.length; j++) {
      projects[i].todos[j].getTitle = Todo.prototype.getTitle;
      projects[i].todos[j].getDueDate = Todo.prototype.getDueDate;
      projects[i].todos[j].getPriority = Todo.prototype.getPriority;
      projects[i].todos[j].getDone = Todo.prototype.getDone;
      projects[i].todos[j].getDescription = Todo.prototype.getDescription;
      projects[i].todos[j].getChecklist = Todo.prototype.getChecklist;
      projects[i].todos[j].getNotes = Todo.prototype.getNotes;
      projects[i].todos[j].getProject = Todo.prototype.getProject;
      projects[i].todos[j].setTitle = Todo.prototype.setTitle;
      projects[i].todos[j].setDueDate = Todo.prototype.setDueDate;
      projects[i].todos[j].setPriority = Todo.prototype.setPriority;
      projects[i].todos[j].setDone = Todo.prototype.setDone;
      projects[i].todos[j].setDescription = Todo.prototype.setDescription;
      projects[i].todos[j].setChecklist = Todo.prototype.setChecklist;
      projects[i].todos[j].setNotes = Todo.prototype.setNotes;
      projects[i].todos[j].setProject = Todo.prototype.setProject;
      projects[i].todos[j].addItemToChecklist = Todo.prototype.addItemToChecklist;
      projects[i].todos[j].deleteItemFromCheckList = Todo.prototype.deleteItemFromCheckList;
    }
    if (projects[i].name === curProject.name) {
      curProject = projects[i];
    }
  }
  // console.log(projects);
  setAllProjects(projects);
  setCurrentProject(curProject);
};

const initialProjectLoad = () => {
  const inbox = new Project('Inbox');
  const today = new Project('Today');
  const thisWeek = new Project('This Week');
  addToProjects(today);
  addToProjects(thisWeek);
  addToProjects(inbox);
  setCurrentProject(inbox);
};

export {saveProjects2Storage, initialProjectLoad, loadProjectsFromStorage};
