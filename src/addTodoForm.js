/* eslint-disable max-len */
'use strict';

import closeImg from './img/close.png';
import {getCurrentProject} from './projects.js';
import {loadTodos} from './pageLoad.js';
import {createNewTodo} from './workOnTodos';
import {blur} from './domManips';


const showFormError = (form, message) => {
  const formError = document.createElement('div');
  formError.classList = ['text-white bg-black rounded-lg shadow-md p-2 flex flex-col gap-2'];
  formError.id = 'formError';
  const errorHeading = document.createElement('h3');
  errorHeading.classList = ['text-2xl'];
  const errorMsg = document.createElement('p');
  const okBut = document.createElement('button');
  okBut.classList = [
    'bg-white text-black rounded-lg active:shadow-md active:shadow-indigo-500',
  ];
  formError.appendChild(errorHeading);
  formError.appendChild(errorMsg);
  formError.appendChild(okBut);
  if (message === 'title') {
    errorHeading.innerText = 'Title is empty!';
    errorMsg.innerText = 'Please write a proper title for your To-Do.';
  } else {
    errorHeading.innerText = 'Date is missing!';
    errorMsg.innerText = 'Please pick a date until your To-Do should be done.';
  }
  okBut.innerText = 'Ok.';
  const content = document.getElementById('content');
  content.appendChild(formError);
  okBut.addEventListener('click', () => {
    blur(form);
    formError.remove();
  });
};

const checkForm = (form, title, date) => {
  if (title === '') {
    showFormError(form, 'title');
    blur(form);
  } else if (date === undefined || date === '') {
    showFormError(form, 'date');
    blur(form);
  } else {
    const main = document.getElementById('main');
    blur(main);
    const project = getCurrentProject();
    const todo = createNewTodo();
    project.addTodo(todo);
    // createNewTodo();
    loadTodos(project);
    form.remove();
  }
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
    'rounded-xl w-5 h-5 min-w-5 min-h-5 text-white align-middle active:shadow-sm',
  ];
  formHeading.appendChild(heading);
  formHeading.appendChild(close);
  close.appendChild(closeBtnImg);
  close.addEventListener('click', () => {
    const main = document.getElementById('main');
    blur(main);
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
  title.input.title = 'Add a To-Do Title here.';
  title.input.classList = [
    'border-black border-2 rounded-lg w-36 active:border-4 focus:border-4 active:border-black focus:border-black',
  ];
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
  input.classList = [
    'border-black border-2 w-36 rounded-lg active:border-4 focus:border-4 active:border-black focus:border-black pl-3',
  ];
  const high = document.createElement('option');
  high.value = 'High';
  high.innerText = 'High';
  const medium = document.createElement('option');
  medium.value = 'Medium';
  medium.innerText = 'Medium';
  const low = document.createElement('option');
  low.value = 'Low';
  low.innerText = 'Low';
  input.appendChild(low);
  input.appendChild(medium);
  input.appendChild(high);
  appendLabelAndInputToDiv(priority.div, priority.label, input);
  return priority.div;
};

const addDescriptionDiv = () => {
  const description = addDivForAddToDoForm();
  description.label.innerText = 'Description';
  description.label.for = 'description';
  description.input.remove();
  const input = document.createElement('textarea');
  input.id = 'description';
  input.name = 'description';
  input.classList = ['border-black border-2 rounded-lg w-36 active:border-4 focus:border-4 active:border-black focus:border-black',
  ];
  appendLabelAndInputToDiv(description.div, description.label, input);
  return description.div;
};

const addSubmitButton = () => {
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.innerText = 'Add To-Do';
  submitButton.classList = [
    'text-white bg-black rounded-xl pl-2 pr-2 active:shadow-md active:shadow-indigo-500',
  ];
  submitButton.addEventListener('click', () => {
    const form = document.getElementById('addTodoForm');
    const title = form.title.value;
    const date = form.dueDate.value;
    checkForm(form, title, date);
  });
  return submitButton;
};

const addFormContent = () => {
  const formContent = document.createElement('div');
  formContent.classList = ['flex flex-col gap-1'];
  formContent.appendChild(addTitleDiv());
  formContent.appendChild(addDueDateDiv());
  formContent.appendChild(addPriorityDiv());
  formContent.appendChild(addDescriptionDiv());
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
  form.classList = [
    'absolute border-black border-2 rounded-xl bg-white shadow-xl p-2 max-w-lg',
  ];
  content.appendChild(form);
  form.appendChild(addFormHeader());
  form.appendChild(addFormContent());
};

export {displayAddTodoForm};
