/* eslint-disable max-len */
'use strict';

import {deleteTodoFromProject} from './workOnTodos.js';
import closeImg from './img/close.png';

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

const displayAddTodoForm = () => {
  const content = document.getElementById('content');
  const form = document.createElement('form');
  form.classList = ['absolute border-black border-2 rounded-xl w-4/5 h-4/5 bg-white shadow-xl p-2'];
  const formHeading = document.createElement('div');
  formHeading.classList = ['flex flex-column justify-between'];
  const heading = document.createElement('h3');
  heading.innerText = 'Add a To-Do';
  heading.classList = ['text-3xl'];
  const close = document.createElement('button');
  const closeBtnImg = document.createElement('img');
  closeBtnImg.src = closeImg;
  close.classList = ['rounded-xl w-5 h-5 min-w-5 min-h-5 text-white align-middle'];
  content.appendChild(form);
  form.appendChild(formHeading);
  formHeading.appendChild(heading);
  formHeading.appendChild(close);
  close.appendChild(closeBtnImg);
};

export {reallySure, displayAddTodoForm};
