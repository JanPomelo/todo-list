/* eslint-disable max-len */
'use strict';

import {deleteTodoFromProject} from './workOnTodos.js';


let editingMode = false;

const patchID = (todo, text) => {
  return todo.getTitle().concat('-', text);
};

const blur = (smth) => {
  smth.classList.toggle('blur-md');
  smth.classList.toggle('pointer-events-none');
};

const customCol3 = (col3, safeBut, cancelBut, editBut) => {
  col3.classList.remove('md:gap-8');
  safeBut.remove();
  cancelBut.remove();
  col3.appendChild(editBut);
};

const makeTDeditable = (id, todo, inputID) => {
  const element = document.getElementById(id);
  let input;
  switch (id) {
    case patchID(todo, 'Title'):
      input = document.createElement('input');
      input.classList = ['w-full h-full text-xs text-slate-500 py-1.5 md:text-sm'];
      input.type = 'text';
      input.defaultValue = element.innerText;
      element.innerText = '';
      element.appendChild(input);
      input.id = inputID;
      break;
    case patchID(todo, 'DueDate'):
      input = document.createElement('input');
      input.type = 'date';
      input.classList = ['text-xs md:text-sm text-slate-500 py-1 DueDateMinWidth'];
      input.defaultValue = element.innerText;
      element.innerText = '';
      element.appendChild(input);
      input.id = inputID;
      break;
    case patchID(todo, 'Priority'):
      break;
    case patchID(todo, 'Checklist'):
      break;
    default:
      input = document.createElement('textarea');
      input.classList = ['max-h-12 h-12 resize-none text-xs w-full'];
      input.defaultValue = element.innerText;
      element.innerText = '';
      element.appendChild(input);
      element.classList.add('pr-5');
      input.id = inputID;
      break;
  }
};

const cancelEdit = (todo) => {
  const descInput = document.getElementById('Description');
  const descTD = document.getElementById(patchID(todo, 'Description'));
  descTD.innerText = descInput.defaultValue;
  descInput.remove();

  const notesInput = document.getElementById('Notes');
  const notesTD = document.getElementById(patchID(todo, 'Notes'));
  notesTD.innerText = notesInput.defaultValue;
  notesInput.remove();

  const titleInput = document.getElementById('Title');
  const titleTD = document.getElementById(patchID(todo, 'Title'));
  titleTD.innerText = titleInput.defaultValue;
  titleInput.remove();

  const dueDateInput = document.getElementById('DueDate');
  const dueDateID = document.getElementById(patchID(todo, 'DueDate'));
  dueDateID.innerText = dueDateInput.defaultValue;
  dueDateInput.remove();
};

const safeEdit = (todo, col3, safeBut, cancelBut, editBut) => {
  const descInput = document.getElementById('Description');
  const descTD = document.getElementById(patchID(todo, 'Description'));
  todo.setDescription(descInput.value);

  const notesInput = document.getElementById('Notes');
  const notesTD = document.getElementById(patchID(todo, 'Notes'));
  todo.setNotes(notesInput.value);

  const titleInput = document.getElementById('Title');
  const titleTD = document.getElementById(patchID(todo, 'Title'));
  if (titleInput.value != '') {
    todo.setTitle(titleInput.value);
    titleTD.innerText = titleInput.value;
  } else {
    titleTD.innerText = titleInput.defaultValue;
  }

  const dueDateInput = document.getElementById('DueDate');
  const dueDateTD = document.getElementById(patchID(todo, 'DueDate'));
  todo.setDueDate(dueDateInput.value);
  dueDateTD.innerText = dueDateInput.value;

  const newChanges = [descInput.value, notesInput.value];
  const newDisplays = [descTD, notesTD];
  for (let value = 0; value < newChanges.length; value++) {
    const newValue = newChanges[value];
    if (newValue.trim() != '' && newValue.trim() != 'empty') {
      console.log(newValue);
      newDisplays[value].classList.remove('text-slate-500');
      newDisplays[value].innerText = newValue;
    } else {
      newDisplays[value].innerText = 'empty';
      newDisplays[value].classList.add('text-slate-500');
    }
  }
  descInput.remove();
  notesInput.remove();
  titleInput.remove();
  dueDateInput.remove();
  customCol3(col3, safeBut, cancelBut, editBut);
};

const expandOneRow = (attribute, text, todo) => {
  const row = document.createElement('tr');
  const col1 = document.createElement('td');
  const col1ID = todo.getTitle().concat('-', text);
  const col2 = document.createElement('td');
  col2.id = col1ID;
  col1.classList = ['pl-4 text-xs md:text-sm bg-gray-100'];
  col2.classList = ['text-xs md:text-sm bg-gray-100'];
  col1.innerText = text;
  if (attribute) {
    if (attribute != 'empty') {
      col2.innerText = attribute;
    } else {
      col2.innerText = 'empty';
      col2.classList.add('text-slate-500');
    }
  } else {
    col2.innerText = 'empty';
    col2.classList.add('text-slate-500');
  }
  col2.colSpan = 3;
  row.appendChild(col1);
  row.appendChild(col2);
  if (text === 'Description') {
    const editBut = document.createElement('button');
    editBut.innerText = 'edit';
    editBut.classList = ['text-xs border-black border rounded-lg px-1 w-12'];
    const col3 = document.createElement('td');
    col3.classList = ['bg-gray-100 h-full'];
    col3.appendChild(editBut);
    col3.rowSpan = 3;
    row.appendChild(col3);
    editBut.addEventListener('click', () => {
      editingMode = true;
      const safeBut = document.createElement('button');
      const cancelBut = document.createElement('button');
      const testDiv = document.createElement('div');
      safeBut.innerText = 'Safe';
      cancelBut.innerText = 'Cancel';
      safeBut.classList = editBut.classList;
      cancelBut.classList = safeBut.classList;
      safeBut.classList.add();
      cancelBut.classList.add();
      editBut.remove();
      testDiv.appendChild(safeBut);
      testDiv.appendChild(cancelBut);
      col3.appendChild(testDiv);
      testDiv.classList.add('grid', 'gap-2', 'justify-center', 'items-center');
      makeTDeditable(col1ID, todo, text);
      makeTDeditable(patchID(todo, 'Notes'), todo, 'Notes');
      makeTDeditable(patchID(todo, 'Title'), todo, 'Title');
      makeTDeditable(patchID(todo, 'DueDate'), todo, 'DueDate');
      cancelBut.addEventListener('click', () => {
        editingMode = false;
        cancelEdit(todo);
        customCol3(col3, safeBut, cancelBut, editBut);
      });
      safeBut.addEventListener('click', () => {
        editingMode = false;
        safeEdit(todo, col3, safeBut, cancelBut, editBut);
      });
    });
  }
  return row;
};

const expandMore = (todo) => {
  const more = [expandOneRow(todo.getDescription(), 'Description', todo)];
  more.push(expandOneRow(todo.getNotes(), 'Notes', todo));
  more.push(expandOneRow(todo.getChecklist(), 'Checklist', todo));

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

const insertDetailRowToTableBody = (row, index) => {
  const tbody = document.getElementById('tableBody');
  if (!index) {
    index = 0;
  }
  if (index >= tbody.children.length) {
    tbody.appendChild(row);
  } else {
    tbody.insertBefore(row, tbody.children[index]);
  }
};


export {reallySure, blur, expandMore, insertDetailRowToTableBody, cancelEdit, editingMode};
