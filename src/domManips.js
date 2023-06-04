/* eslint-disable max-len */
'use strict';

import {deleteTodoFromProject, createNewTodo} from './workOnTodos.js';
import closeImg from './img/close.png';
import {getCurrentProject} from './projects.js';
import {loadPage, loadTodos} from './pageLoad.js';

const reallySure = (project, todo) => {
  const content = document.getElementById('content');
  const popUp = document.createElement('div');
  popUp.classList = ['absolute grid grid-cols-2 gap-y-2 border-2 border-black rounded-xl p-2 max-w-sm shadow-xl bg-white'];
  popUp.id = 'popUpDelete';
  const popUpHeadline = document.createElement('h3');
  popUpHeadline.innerText = 'Are you sure?';
  popUpHeadline.classList = ['col-span-2 text-2xl font-bold'];
  const popUpText = document.createElement('p');
  // eslint-disable-next-line max-len
  popUpText.innerText = 'You are about to delete this To-Do from your current Project. You can\'t restore it. Are you sure you want to do this?';
  popUpText.classList = ['col-span-2'];
  const popUpYes = document.createElement('button');
  popUpYes.innerHTML = 'Delete';
  popUpYes.classList = ['border-2 border-black rounded-lg w-4/5 justify-self-center bg-black text-white active:shadow-md active:shadow-indigo-500'];
  popUpYes.addEventListener('click', () => {
    deleteTodoFromProject(project, todo);
    deleteReallySure();
  });
  const popUpNo = document.createElement('button');
  popUpNo.innerHTML = 'Keep';
  popUpNo.classList = popUpYes.classList;
  popUpNo.addEventListener('click', () => {
    deleteReallySure();
  });
  popUp.appendChild(popUpHeadline);
  popUp.appendChild(popUpText);
  popUp.appendChild(popUpYes);
  popUp.appendChild(popUpNo);
  content.appendChild(popUp);
  return;
};

const deleteReallySure = () => {
  const popUp = document.getElementById('popUpDelete');
  popUp.remove();
};

const addFormHeader = () => {
  const formHeading = document.createElement('div');
  formHeading.classList = ['flex flex-column justify-between mb-3'];
  const heading = document.createElement('h3');
  heading.innerText = 'Add a To-Do';
  heading.classList = ['text-3xl'];
  const close = document.createElement('button');
  const closeBtnImg = document.createElement('img');
  closeBtnImg.src = closeImg;
  close.classList = [
    'rounded-xl w-5 h-5 min-w-5 min-h-5 text-white align-middle',
  ];
  formHeading.appendChild(heading);
  formHeading.appendChild(close);
  close.appendChild(closeBtnImg);
  close.addEventListener('click', () => {
    const form = document.getElementById('addTodoForm');
    form.remove();
  });
  return formHeading;
};

const addDivForAddToDoForm = () => {
  const div = document.createElement('div');
  div.classList = [
    'flex flex-colum justify-between gap-8 md:justify-start md:gap-56',
  ];
  const label = document.createElement('label');
  label.classList = ['text-xl w-32'];
  const input = document.createElement('input');
  input.classList = ['w-36 justify-self-end'];
  return {div, label, input};
};

const appendLabelAndInputToDiv = (div, label, input) => {
  div.appendChild(label);
  div.appendChild(input);
};

const addTitleDiv = () => {
  const title = addDivForAddToDoForm();
  title.label.innerText = 'Title';
  title.label.for = 'title';
  title.input.type = 'text';
  title.input.id = 'title';
  title.input.name = 'title';
  // titleInput.required = true;
  title.input.title = 'Add a To-Do Title here.';
  title.input.classList = [
    'border-black border-2 rounded-lg w-36 active:border-4 focus:border-4 active:border-black focus:border-black'];
  appendLabelAndInputToDiv(title.div, title.label, title.input);
  return title.div;
};

const addDueDateDiv = () => {
  const dueDate = addDivForAddToDoForm();
  dueDate.label.innerText = 'Due Date';
  dueDate.label.for = 'datePicker';
  dueDate.input.type = 'date';
  dueDate.input.name = 'dueDate';
  dueDate.input.id = 'datePicker';
  dueDate.input.classList = ['text-xl'];
  appendLabelAndInputToDiv(dueDate.div, dueDate.label, dueDate.input);
  return dueDate.div;
};

const addPriorityDiv = () => {
  const priority = addDivForAddToDoForm();
  priority.label.innerText = 'Priority';
  priority.label.for = 'priorities';
  priority.input.remove();
  const input = document.createElement('select');
  priority.div.appendChild(input);
  input.name = 'priority';
  input.id = 'priorities';
  input.classList = ['border-black border-2 w-36 rounded-lg active:border-4 focus:border-4 active:border-black focus:border-black pl-3'];
  const high = document.createElement('option');
  high.value = 'High';
  high.innerText = 'High';
  input.appendChild(high);
  const medium = document.createElement('option');
  medium.value = 'Medium';
  medium.innerText = 'Medium';
  input.appendChild(medium);
  const low = document.createElement('option');
  low.value = 'Low';
  low.innerText = 'Low';
  input.appendChild(low);
  appendLabelAndInputToDiv(priority.div, priority.label, input);
  return priority.div;
};

const addSubmitButton = () => {
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.innerText = 'Add To-Do';
  submitButton.classList = ['text-white bg-black rounded-xl pl-2 pr-2'];
  submitButton.addEventListener('click', () => {
    const project = getCurrentProject();
    const todo = createNewTodo();
    project.addTodo(todo);
    // createNewTodo();
    loadTodos(project);
    const form = document.getElementById('addTodoForm');
    form.remove();
  });
  return submitButton;
};

const addFormContent = () => {
  const formContent = document.createElement('div');
  formContent.appendChild(addTitleDiv());
  formContent.appendChild(addDueDateDiv());
  formContent.appendChild(addPriorityDiv());
  formContent.appendChild(addSubmitButton());
  return formContent;
};

const displayAddTodoForm = () => {
  const content = document.getElementById('content');
  const form = document.createElement('form');
  form.onsubmit = () => {
    return false;
  };
  form.action = 'submit';
  form.id = 'addTodoForm';
  form.classList = ['absolute border-black border-2 rounded-xl w-4/5 h-4/5 bg-white shadow-xl p-2'];
  content.appendChild(form);
  form.appendChild(addFormHeader());
  form.appendChild(addFormContent());
};

export {reallySure, displayAddTodoForm};
