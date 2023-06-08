/* eslint-disable max-len */
'use strict';

import {deleteTodoFromProject} from './workOnTodos.js';
import Plus from './img/plus.png';
import Muelltonne from './img/mulltonne.png';
import {addTodoToNewProject, getAllProjects, getCurrentProject, setCurrentProject} from './projects.js';


let editingMode = false;
let tempSaver = [];

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

const createDivForChecklist = (input, todo, fullSave = true) => {
  const item = document.createElement('div');
  item.classList = ['flex justify-between items-center'];
  const text = document.createElement('p');
  text.innerText = '- ' + input;
  if (!fullSave) {
    text.classList = 'text-slate-500';
  }
  const deleteBut = document.createElement('button');
  const deleteImg = document.createElement('img');
  deleteImg.src = Muelltonne;
  deleteBut.appendChild(deleteImg);
  deleteBut.classList = [
    'bg-white border-black border rounded-md w-3 h-3 p-0.5 deleteButs',
  ];
  deleteBut.addEventListener('click', () => {
    if (fullSave) {
      todo.deleteItemFromCheckList(input);
    } else {
      for (let i = tempSaver.length - 1; i >= 0; i--) {
        if (input === tempSaver[i]) {
          tempSaver.splice(i, 1);
        }
      }
    }
    item.remove();
  });
  item.appendChild(text);
  item.appendChild(deleteBut);
  return item;
};

const deleteButToggle = (visible) => {
  const deleteBut = document.getElementsByClassName('deleteButs');
  if (deleteBut) {
    if (visible ==='visible') {
      for (let i = 0; i < deleteBut.length; i++) {
        deleteBut[i].classList.remove('invisible');
      }
    } else if (visible === 'invisible') {
      for (let i = 0; i < deleteBut.length; i++) {
        deleteBut[i].classList.add('invisible');
      }
    }
  }
};

const displayCheckListItems = (todo, tempSaverDiv = '') => {
  const oldDiv = document.getElementById(patchID(todo, 'currentChecklist'));
  if (oldDiv) oldDiv.remove();
  const checkListCol = document.getElementById(patchID(todo, 'Checklist'));
  const currentCheckList = todo.getChecklist();
  const div = document.createElement('div');
  div.id = patchID(todo, 'currentChecklist');
  div.classList = ['flex flex-col gap-1'];
  checkListCol.appendChild(div);
  if (currentCheckList.length === 0) {
    if (tempSaverDiv != '') {
      div.append(tempSaverDiv);
    } else {
      div.innerText = 'empty';
      div.classList.add('text-slate-500');
      return;
    }
  }
  for (let i = 0; i < currentCheckList.length; i++) {
    const item = createDivForChecklist(currentCheckList[i], todo);
    div.appendChild(item);
  }
  if (tempSaverDiv != '') {
    div.append(tempSaverDiv);
    div.classList.remove('text-slate-500');
  }
};


const makeTDeditable = (id, todo, inputID) => {
  const element = document.getElementById(id);
  let input;
  switch (id) {
    case patchID(todo, 'Title'):
      input = document.createElement('input');
      input.classList = ['w-full h-7 text-xs text-slate-500 md:text-sm pl-1'];
      input.type = 'text';
      input.defaultValue = element.innerText;
      element.innerText = '';
      element.appendChild(input);
      input.id = inputID;
      break;
    case patchID(todo, 'DueDate'):
      input = document.createElement('input');
      input.type = 'date';
      input.classList = ['text-xs md:text-sm text-slate-500 h-7 py-1 DueDateMinWidth md:w-full'];
      input.defaultValue = element.innerText;
      element.innerText = '';
      element.appendChild(input);
      input.id = inputID;
      break;
    case patchID(todo, 'Priority'):
      input = document.createElement('select');
      const high = document.createElement('option');
      input.classList = [' pl-2 w-full text-xs text-slate-500 h-7 md:text-sm'];
      input.defaultValue = element.innerText;
      element.innerText = '';
      element.appendChild(input);
      input.id = inputID;
      high.value = 'high';
      high.innerText = 'high';
      const medium = document.createElement('option');
      medium.value = 'medium';
      medium.innerText = 'medium';
      const low = document.createElement('option');
      low.value = 'low';
      low.innerText = 'low';
      input.appendChild(low);
      input.appendChild(medium);
      input.appendChild(high);
      switch (input.defaultValue) {
        case 'high':
          high.selected = true;
          break;
        case 'medium':
          medium.selected = true;
          break;
        case 'low':
          low.selected = true;
          break;
        default:
          break;
      }
      break;
    case patchID(todo, 'Project'):
      input = document.createElement('select');
      input.classList = ['w-full text-xs text-slate-500 h-7 md:text-sm'];
      input.defaultValue = element.innerText;
      element.innerText = '';
      element.appendChild(input);
      input.id = inputID;
      const projects = getAllProjects();
      for (let i = 2; i < projects.length; i++) {
        const option = document.createElement('option');
        option.value = projects[i].getName();
        option.innerText = option.value;
        input.appendChild(option);
        if (input.defaultValue === option.value) {
          option.selected = true;
        }
      }
      break;
    case patchID(todo, 'Checklist'):
      const existingDiv = document.getElementById(patchID(todo, 'currentChecklist'));
      console.log(existingDiv);
      const container = document.createElement('div');
      input = document.createElement('input');
      const button = document.createElement('button');
      const butImg = document.createElement('img');
      butImg.src = Plus;
      button.appendChild(butImg);
      container.classList = ['flex gap-2 items-center'];
      input.classList = ['h-7 text-xs text-slate-500 md:text-sm pr-5 w-full'];
      button.classList = ['bg-white border-black border rounded-md w-3 h-3 p-0.5'];
      close.classlist = button.classList;
      container.appendChild(input);
      container.appendChild(button);
      input.type = 'text';
      existingDiv.appendChild(container);
      container.id = inputID;
      button.addEventListener('click', () => {
        tempSaver.push(input.value);
        let tempSaverDiv = document.getElementById('tempSaverDiv');
        if (tempSaverDiv) {
          tempSaverDiv.remove();
        }
        tempSaverDiv = document.createElement('div');
        tempSaverDiv.id = 'tempSaverDiv';
        tempSaverDiv.classList = ['flex flex-col gap-1 my-1'];
        for (let i = 0; i < tempSaver.length; i++) {
          const item = createDivForChecklist(tempSaver[i], todo, false);
          tempSaverDiv.appendChild(item);
          container.appendChild(input);
          container.appendChild(button);
        }
        displayCheckListItems(todo, tempSaverDiv);
        makeTDeditable(id, todo, inputID);
      });
      break;
    default:
      input = document.createElement('textarea');
      input.classList = ['max-h-12 h-12 resize-none text-xs w-full'];
      input.defaultValue = element.innerText;
      element.innerText = '';
      element.appendChild(input);
      input.id = inputID;
      break;
  }
};

const rebuildOriginalTodoInfos = (todo, property) => {
  const input = document.getElementById(property);
  const td = document.getElementById(patchID(todo, property));
  td.innerText = input.defaultValue;
  input.remove();
  tempSaver = [];
};

const cancelEdit = (todo) => {
  rebuildOriginalTodoInfos(todo, 'Description');
  rebuildOriginalTodoInfos(todo, 'Notes');
  rebuildOriginalTodoInfos(todo, 'Project');
  rebuildOriginalTodoInfos(todo, 'Title');
  rebuildOriginalTodoInfos(todo, 'DueDate');
  rebuildOriginalTodoInfos(todo, 'Priority');
  displayCheckListItems(todo);
  editingMode = false;
  deleteButToggle('invisible');
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

  const priorityInput = document.getElementById('Priority');
  const priorityTD = document.getElementById(patchID(todo, 'Priority'));
  todo.setPriority(priorityInput.value);
  priorityTD.innerText = priorityInput.value;

  const checkListInput = document.getElementById('Checklist');
  if (checkListInput) {
    checkListInput.remove();
  }
  if (tempSaver.length > 0) {
    const checkListInput = document.getElementById('Checklist');
    if (checkListInput) {
    }
    for (let i = 0; i < tempSaver.length; i++) {
      todo.addItemToChecklist(tempSaver[i]);
    }
    displayCheckListItems(todo, '');
    tempSaver = [];
  }

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
  deleteButToggle('invisible');
  const projectInput = document.getElementById('Project');
  const projectTD = document.getElementById(patchID(todo, 'Project'));
  if (projectInput.innerText != todo.getProject()) {
    const project = getCurrentProject();
    deleteTodoFromProject(project, todo);
    setCurrentProject(project);
    addTodoToNewProject(todo, todo.getProject());
  }
  todo.setProject(projectInput.value);
  projectTD.innerText = projectInput.value;
  descInput.remove();
  projectInput.remove();
  notesInput.remove();
  titleInput.remove();
  dueDateInput.remove();
  priorityInput.remove();
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
  if (text != 'Checklist') {
    if (attribute) {
      {
        if (attribute != 'empty') {
          col2.innerText = attribute;
        } else {
          col2.innerText = 'empty';
          col2.classList.add('text-slate-500');
        }
      }
    } else {
      col2.innerText = 'empty';
      col2.classList.add('text-slate-500');
    }
  }

  col2.colSpan = 2;
  row.appendChild(col1);
  row.appendChild(col2);
  if (text === 'Project') {
    const editBut = document.createElement('button');
    editBut.innerText = 'edit';
    editBut.classList = ['text-xs border-black border rounded-lg px-1 w-12'];
    const col3 = document.createElement('td');
    const editButDiv = document.createElement('div');
    editButDiv.classList = ['h-full w-full flex justify-center items-center'];
    col3.classList = ['bg-gray-100 h-full'];
    col3.appendChild(editButDiv);
    editButDiv.appendChild(editBut);
    col3.rowSpan = 4;
    col3.colSpan = 2;
    row.appendChild(col3);
    editBut.addEventListener('click', () => {
      editingMode = true;
      deleteButToggle('visible');
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
      makeTDeditable(patchID(todo, 'Description'), todo, 'Description');
      makeTDeditable(patchID(todo, 'Notes'), todo, 'Notes');
      makeTDeditable(patchID(todo, 'Title'), todo, 'Title');
      makeTDeditable(patchID(todo, 'DueDate'), todo, 'DueDate');
      makeTDeditable(patchID(todo, 'Priority'), todo, 'Priority');
      makeTDeditable(patchID(todo, 'Checklist'), todo, 'Checklist');
      makeTDeditable(patchID(todo, 'Project'), todo, 'Project');
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
  const more = [expandOneRow(todo.getProject(), 'Project', todo)];
  more.push(expandOneRow(todo.getDescription(), 'Description', todo));
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


export {reallySure, blur, expandMore, insertDetailRowToTableBody, cancelEdit, editingMode, displayCheckListItems, deleteButToggle};
