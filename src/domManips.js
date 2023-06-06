/* eslint-disable max-len */
'use strict';

import {deleteTodoFromProject} from './workOnTodos.js';

const blur = (smth) => {
  smth.classList.toggle('blur-md');
  smth.classList.toggle('pointer-events-none');
};

const expandOneRow = (attribute, text, todo) => {
  const row = document.createElement('tr');
  const col1 = document.createElement('td');
  const col2 = document.createElement('td');
  const col3 = document.createElement('td');
  col1.classList = ['pl-4 text-sm bg-gray-100'];
  col2.classList = ['text-sm bg-gray-100'];
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
  col3.classList = ['h-full py-1 bg-gray-100 flex justify-center items-center md:justify-start'];
  col3.colSpan = 2;
  const editBut = document.createElement('button');
  editBut.innerText = 'edit';
  editBut.classList = ['text-xs border-black border rounded-lg px-1'];
  col3.appendChild(editBut);
  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(col3);
  editBut.addEventListener('click', () => {
    const safeBut = document.createElement('button');
    const cancelBut = document.createElement('button');
    safeBut.innerText = 'Safe';
    safeBut.classList = editBut.classList;
    safeBut.classList.add('m-1', 'md:m-0');
    cancelBut.classList = safeBut.classList;
    cancelBut.innerText = 'Cancel';
    editBut.remove();
    col3.appendChild(safeBut);
    col3.appendChild(cancelBut);
    col3.classList.add(
        'flex-col',
        'md:flex-row',
        'md:gap-8',
        'md:justify-start',
        'h-14');
    if (text === 'Description' || text === 'Notes') {
      const input = document.createElement('textarea');
      input.classList = ['max-h-12 h-12 resize-none w-full'];
      input.defaultValue = col2.innerText;
      col2.innerText = '';
      col2.appendChild(input);
      col2.classList.add('pr-5');
      input.id = text;
    }
    cancelBut.addEventListener('click', () => {
      if (text === 'Description' || text === 'Notes') {
        const input = document.getElementById(text);
        col2.innerText = input.defaultValue;
        input.remove();
      }
      col3.classList.remove(
          'flex-col',
          'md:flex-row',
          'md:gap-8',
          'md:justify-start',
          'h-14',
      );
      safeBut.remove();
      cancelBut.remove();
      col3.appendChild(editBut);
    });
    safeBut.addEventListener('click', () => {
      let newValue ='';
      if (text === 'Description' || text === 'Notes') {
        const input = document.getElementById(text);
        if (text === 'Description') {
          todo.setDescription(input.value);
          newValue = todo.getDescription();
        } else {
          todo.setNotes(input.value);
          newValue = todo.getNotes();
        }
        if (newValue.trim() != '' && newValue.trim() != 'empty') {
          console.log(newValue);
          col2.classList.remove('text-slate-500');
          col2.innerText = newValue;
        } else {
          col2.innerText = 'empty';
        }
        input.remove();
        col3.classList.remove(
            'flex-col',
            'md:flex-row',
            'md:gap-8',
            'md:justify-start',
            'h-14',
        );
        safeBut.remove();
        cancelBut.remove();
        col3.appendChild(editBut);
      }
    });
  });
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


export {reallySure, blur, expandMore, insertDetailRowToTableBody};
