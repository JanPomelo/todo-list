/* eslint-disable max-len */
'use strict';

import {addToProjects, getAllProjects, Project} from './projects';
import Plus from './img/plus.png';

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
      projectDiv.classList = ['flex justify-between'];
      const projectText = document.createElement('p');
      const projectButton = document.createElement('button');
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
  buttons.classList = ['flex justify-between mt-5 '];
  const choose = document.createElement('button');
  choose.classList = ['border rounded-lg border-black px-1 items-center'];
  choose.innerText = 'Pick';
  const cancel = document.createElement('button');
  cancel.innerText = 'Cancel';
  cancel.classList = ['border rounded-lg border-black px-1 items-center'];
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
