/* eslint-disable max-len */
'use strict';

import {deleteTodoFromProject} from './workOnTodos.js';

const blur = (smth) => {
  smth.classList.toggle('blur-md');
  smth.classList.toggle('pointer-events-none');
};

const expandOneRow = (attribute, text) => {
  const row = document.createElement('tr');
  const col1 = document.createElement('td');
  const col2 = document.createElement('td');
  const col3 = document.createElement('td');
  col1.classList = ['pl-4 text-sm'];
  col2.classList = ['text-sm'];
  col1.innerText = text;
  if (attribute) {
    col2.innerText = attribute;
  } else {
    col2.innerText = 'empty';
    col2.classList.add('opacity-50');
  }
  col2.colSpan = 3;
  const button = document.createElement('button');
  col3.appendChild(button);
  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(col3);
  return row;
};

const expandMore = (todo) => {
  const more = [expandOneRow(todo.getDescription(), 'Description')];
  more.push(expandOneRow(todo.getNotes(), 'Notes'));
  more.push(expandOneRow(todo.getChecklist(), 'Checklist'));

  return more;
};

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
  const main = document.getElementById('main');
  popUpYes.addEventListener('click', () => {
    deleteTodoFromProject(project, todo);
    deleteReallySure();
    blur(main);
  });
  const popUpNo = document.createElement('button');
  popUpNo.innerHTML = 'Keep';
  popUpNo.classList = popUpYes.classList;
  popUpNo.addEventListener('click', () => {
    deleteReallySure();
    blur(main);
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

export {reallySure, blur, expandMore};
