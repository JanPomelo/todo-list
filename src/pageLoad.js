/* eslint-disable max-len */
'use strict';

import replay from './img/replay.png';
import muellTonne from './img/mulltonne.png';
import {getCurrentProject} from './projects';
import {toggleDone} from './workOnTodos';
import {reallySure} from './domManips';
import {displayAddTodoForm} from './addTodoForm';
import {blur, expandMore, insertDetailRowToTableBody, cancelEdit, editingMode} from './domManips';

const loadHeaderMainHeading = () => {
  const heading = document.createElement('h1');
  heading.innerText = 'Mini-Do';
  heading.classList = ['text-white text-4xl'];
  return heading;
};

const loadHeaderSubHeading = () => {
  const subHeading = document.createElement('h2');
  subHeading.innerText = 'The minimalistic To-Do-List.';
  subHeading.classList = ['text-white text-xl mb-1'];
  return subHeading;
};

const loadHeader = () => {
  // create Header Element
  const header = document.createElement('header');
  // add styling to header
  header.classList = ['bg-black flex flex-col justify-center items-center'];
  // add headerContent to HeaderElement
  header.appendChild(loadHeaderMainHeading());
  header.appendChild(loadHeaderSubHeading());
  return header;
};

const loadToDoHeading = () => {
  const div = document.createElement('div');
  div.classList = ['w-full flex flex-row gap-3 pl-2 pt-1 pb-1 items-center'];
  const text = document.createElement('h3');
  text.innerText = 'Your To-Dos:';
  text.classList = ['font-bold'];
  const button = document.createElement('button');
  button.classList = [
    'rounded-xl border-black border-2 pl-2 pr-2 active:shadow-md active:shadow-indigo-500',
  ];
  button.innerText = 'Add To-Do';
  button.id = 'addTodoBut';
  button.addEventListener('click', () => {
    const main = document.getElementById('main');
    blur(main);
    displayAddTodoForm();
  });
  div.appendChild(text);
  div.appendChild(button);
  return div;
};

const deleteCurrentTab = () => {
  const tableBody = document.getElementById('tableBody');
  if (tableBody) {
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
  }
};

const loadTodos = (project, tableBody = document.getElementById('tableBody')) => {
  deleteCurrentTab();
  tableBody.classList.add('bg-gray-200', 'text-sm', 'md:text-base');
  const allRows = [];
  for (let i = 0; i < project.todos.length; i++) {
    const row = document.createElement('tr');
    row.classList = ['border-black border-t'];
    for (let j = 0; j < 5; j++) {
      const td = document.createElement('td');
      switch (j) {
        case 0:
          td.innerText = project.todos[i].getTitle();
          td.classList = ['pl-2'];
          td.id = project.todos[i].getTitle().concat('-', 'Title');
          break;
        case 1:
          td.innerText = project.todos[i].getDueDate();
          td.id = project.todos[i].getTitle().concat('-', 'DueDate');
          break;
        case 2:
          td.innerText = project.todos[i].getPriority();
          td.id = project.todos[i].getTitle().concat('-', 'Priority');
          break;
        case 3:
          const moreBut = document.createElement('button');
          td.appendChild(moreBut);
          moreBut.innerHTML = '...';
          moreBut.addEventListener('click', function expand() {
            const details = expandMore(project.todos[i]);
            for (let j = details.length - 1; j >= 0; j--) {
              insertDetailRowToTableBody(details[j], row.rowIndex);
            }
            moreBut.removeEventListener('click', expand);
            moreBut.addEventListener('click', function minimize() {
              if (editingMode) {
                cancelEdit(project.todos[i]);
              }
              for (let j = details.length - 1; j >= 0; j--) {
                tableBody.deleteRow(row.rowIndex);
              }
              moreBut.removeEventListener('click', minimize);
              moreBut.addEventListener('click', expand);
            });
          });
          break;
        case 4:
          td.classList = ['flex flex-row-reverse justify-between items-center h-7 pr-2 relative'];
          const trash = document.createElement('button');
          const trashIcon = document.createElement('img');
          trashIcon.src = muellTonne;
          trash.appendChild(trashIcon);
          trash.classList = ['w-4 h-4 border p-0.5 border-black rounded-md'];
          td.appendChild(trash);
          const tickDone = document.createElement('button');
          tickDone.classList = [
            'text-sm/3  w-4 h-4 border-black border rounded-md',
          ];
          td.appendChild(tickDone);
          if (project.todos[i].getDone() === true) {
            row.classList.add('strikeout');
            const replayImg = document.createElement('img');
            replayImg.src = replay;
            tickDone.appendChild(replayImg);
          } else {
            tickDone.innerText = '✓';
          }
          tickDone.addEventListener('click', () => {
            toggleDone(project, project.todos[i]);
          });
          trash.addEventListener('click', () => {
            const main = document.getElementById('main');
            blur(main);
            reallySure(project, project.todos[i]);
          });
      }
      td.classList.add('relative');
      row.appendChild(td);
    }
    allRows.push(row);
  }
  for (let i = 0; i < allRows.length; i++) {
    tableBody.appendChild(allRows[i]);
  }
};

const loadTable = () => {
  const table = document.createElement('table');
  table.classList = ['w-full text-left'];
  const tableHeader = document.createElement('thead');
  table.appendChild(tableHeader);
  const tableBody = document.createElement('tbody');
  tableBody.id = 'tableBody';
  table.appendChild(tableBody);
  const headerRow = document.createElement('tr');
  headerRow.classList = ['bg-blue-100'];
  const title = document.createElement('th');
  title.classList = ['w-1/3 pl-2'];
  title.innerText = 'TITLE';
  const dueTo = document.createElement('th');
  dueTo.innerText = 'DUE';
  dueTo.classList = ['w-1/4'];
  const priority = document.createElement('th');
  priority.innerText = 'PRIO';
  priority.classList = ['w-20'];
  const more = document.createElement('th');
  more.innerText = '...';
  more.classList = ['w-6'];
  const done = document.createElement('th');
  done.classList = ['w-1/10 md:w-1/6'];
  headerRow.appendChild(title);
  headerRow.appendChild(dueTo);
  headerRow.appendChild(priority);
  headerRow.appendChild(more);
  headerRow.appendChild(done);
  tableHeader.appendChild(headerRow);
  loadTodos(getCurrentProject(), tableBody);
  return table;
};


const loadToDoDiv = () => {
  const todoDiv = document.createElement('div');
  todoDiv.classList = [
    'h-full w-full flex flex-col sm:rounded-3xl sm:border-4 border-black sm:h-4/5 sm:w-full bg-white shadow-gray-950 sm:shadow-xl sm:shadow-gray-950',
  ];
  todoDiv.appendChild(loadToDoHeading());
  todoDiv.appendChild(loadTable());
  return todoDiv;
};

const loadMain = () => {
  const main = document.createElement('main');
  main.classList = ['flex-grow bg-grey-100 flex justify-center items-center sm:pl-5 sm:pr-5 xl:pr-20 xl:pl-20'];
  main.id = 'main';
  main.appendChild(loadToDoDiv());
  return main;
};

const loadFooterText1 = () => {
  const text = document.createElement('p');
  text.innerText = 'A Project from JanPomelo';
  text.classList = ['text-white text-lg'];
  return text;
};

const loadFooterText2 = () => {
  const text = document.createElement('p');
  text.innerText = 'All Rights Reserved';
  text.classList = ['text-white '];
  return text;
};

const loadFooter = () => {
  const footer = document.createElement('footer');
  footer.classList = ['bg-black flex flex-col justify-center items-center p-1'];
  footer.appendChild(loadFooterText1());
  footer.appendChild(loadFooterText2());
  return footer;
};

const loadPage = () => {
  const content = document.createElement('div');
  content.id = 'content';
  content.classList = ['flex flex-col h-screen'];
  content.appendChild(loadHeader());
  content.appendChild(loadMain());
  content.appendChild(loadFooter());
  return content;
};
export {loadTodos, loadPage};
