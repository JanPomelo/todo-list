/* eslint-disable max-len */
'use strict';

import {addToProjects, getAllProjects, Project} from './projects';
import Plus from './img/plus.png';
import Muelltonne from './img/mulltonne.png';

const loadDeleteProjectWindow = (project) => {
  const div = document.createElement('div');
  div.id = 'deleteProjectWindow';
  div.classList = ['flex flex-col gap-1 bg-white border-2 border-black rounded-xl p-2 w-64'];
  const heading = document.createElement('h3');
  heading.innerText = 'Are you sure?';
  heading.classList = ['font-bold'];
  const text = document.createElement('p');
  text.innerHTML = 'You are about to <b>delete</b> the following Project: <b>' + project.name + '</b>';
  const select = document.createElement('fieldset');
  select.classList = ['flex flex-col'];
  const shiftTodos = document.createElement('div');
  shiftTodos.classList = ['flex gap-2'];
  const shiftTodosLabel = document.createElement('label');
  shiftTodosLabel.for = 'shift';
  shiftTodosLabel.innerText = 'Shift Todos to Inbox.';
  const shiftTodosRadio = document.createElement('input');
  shiftTodosRadio.type = 'radio';
  shiftTodosRadio.value = 'shift';
  shiftTodosRadio.id = 'shift';
  shiftTodosRadio.checked = true;
  shiftTodosRadio.name = 'todoSelection';
  const delTodos = document.createElement('div');
  delTodos.classList = shiftTodos.classList;
  const deleteTodosLabel = document.createElement('label');
  deleteTodosLabel.for = 'delete';
  deleteTodosLabel.innerText = 'Delete To-Do\'s as well';
  const delTodosRadio = document.createElement('input');
  delTodosRadio.type = 'radio';
  delTodosRadio.value = 'delete';
  delTodosRadio.id = 'delete';
  delTodosRadio.name = 'todoSelection';
  const buttons = document.createElement('div');
  buttons.classList = ['flex justify-between mt-5'];
  const yes = document.createElement('button');
  yes.innerText = 'Yes, delete!';
  yes.classList = ['border border-black rounded px-1 text-white bg-black'];
  const no = document.createElement('button');
  no.innerText = 'No, keep!';
  no.classList = yes.classList;
  buttons.appendChild(yes);
  buttons.appendChild(no);
  div.appendChild(heading);
  div.appendChild(text);
  div.appendChild(select);
  select.appendChild(shiftTodos);
  shiftTodos.appendChild(shiftTodosRadio);
  shiftTodos.appendChild(shiftTodosLabel);
  select.appendChild(delTodos);
  delTodos.appendChild(delTodosRadio);
  delTodos.appendChild(deleteTodosLabel);
  div.appendChild(buttons);
  const main = document.getElementById('main');
  main.appendChild(div);
};


const loadProjectEditWindow = () => {
  const div = document.createElement('div');
  div.id = 'projectEditWindow';
  div.classList = ['bg-white rounded-xl w-3/5 h-3/5 border-2 border-black px-2 py-1 flex flex-col'];
  const headingDefault = document.createElement('h3');
  headingDefault.innerText = 'Default Projects';
  headingDefault.classList = ['text-lg font-bold border-b'];
  div.appendChild(headingDefault);
  for (let i = 0; i <= 2; i++) {
    const projectDiv = document.createElement('div');
    projectDiv.innerText = getAllProjects()[i].getName();
    div.appendChild(projectDiv);
  }
  const headingCustom = document.createElement('h3');
  headingCustom.innerText = 'Custom Projects';
  headingCustom.classList = ['text-lg font-bold border-y'];
  div.appendChild(headingCustom);
  if (getAllProjects().length > 3) {
    for (let i = 3; i < getAllProjects().length; i++) {
      const projectDiv = document.createElement('div');
      projectDiv.classList = ['flex justify-between items-center'];
      const projectText = document.createElement('p');
      const projectButton = document.createElement('button');
      const projectButtonImg = document.createElement('img');
      projectButtonImg.src = Muelltonne;
      projectButton.appendChild(projectButtonImg);
      projectButton.classList = ['w-4 h-4 border border-black rounded p-0.5'];
      projectButton.addEventListener('click', () => {
        loadDeleteProjectWindow(getAllProjects()[i]);
      });
      projectText.innerText = getAllProjects()[i].getName();
      projectDiv.appendChild(projectText);
      projectDiv.appendChild(projectButton);
      div.appendChild(projectDiv);
    }
  }
  if (getAllProjects().length < 11) {
    const add = document.createElement('div');
    add.classList = ['flex items-center gap-1 h-5 mt-1'];
    const addBut = document.createElement('div');
    const addButImg = document.createElement('img');
    addButImg.src = Plus;
    addBut.appendChild(addButImg);
    addBut.classList = ['w-4 h-4 mr-2'];
    const addText = document.createElement('input');
    addText.defaultValue = 'New Project';
    addText.addEventListener('click', function deleteInputValue() {
      addText.value = '';
      addText.removeEventListener('click', deleteInputValue);
    });
    addText.classList = ['text-slate-500'];
    add.appendChild(addBut);
    add.appendChild(addText);
    div.appendChild(add);
    addBut.addEventListener('click', function addInputToProject() {
      if (addText.value.trim() != '' && addText.value.trim() != 'New Project') {
        addToProjects(new Project(addText.value, []));
      }
      loadProjectEditWindow();
      div.remove();
    });
  }
  const buttons = document.createElement('div');
  buttons.classList = ['flex justify-between mt-auto '];
  const choose = document.createElement('button');
  choose.classList = ['border rounded-lg border-black px-1 items-center bg-black text-white'];
  choose.innerText = 'Pick';
  const cancel = document.createElement('button');
  cancel.innerText = 'Cancel';
  cancel.classList = ['border rounded-lg border-black px-1 items-center bg-black text-white'];
  cancel.addEventListener('click', () => {
    div.remove();
  });
  div.appendChild(buttons);
  buttons.appendChild(choose);
  buttons.appendChild(cancel);
  const main = document.getElementById('main');
  main.appendChild(div);
};

export {loadProjectEditWindow};
