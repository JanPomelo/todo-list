/* eslint-disable max-len */
'use strict';
/* eslint-disable require-jsdoc */

import {compareAsc, parseISO} from 'date-fns';
class Todo {
  constructor(title, dueDate, priority, description, checklist = [], notes = '', done = 'false', project = 'Inbox') {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;
    this.notes = notes;
    this.done = done;
    this.project = project;
  }
  /*
  getTitle = () => {
    return this.title;
  };

  getDescription = () => {
    return this.description;
  };

  getDueDate = () => {
    return this.dueDate;
  };

  getPriority = () => {
    return this.priority;
  };

  getChecklist = () => {
    return this.checklist;
  };

  getNotes = () => {
    return this.notes;
  };

  getDone = () => {
    return this.done;
  };

  getProject = () => {
    return this.project;
  };

  setTitle = (title) => {
    this.title = title;
  };

  setDescription = (description) => {
    this.description = description;
  };

  setDueDate = (dueDate) => {
    this.dueDate = dueDate;
  };

  setPriority = (priority) => {
    this.priority = priority;
  };

  setChecklist = (checkList) => {
    this.checklist = checkList;
  };

  setProject = (projectName) => {
    this.project = projectName;
  };

  addItemToChecklist = (item) => {
    if (item.trim() != '') {
      this.checklist.push(item);
      console.log(this.checklist);
    }
  };

  deleteItemFromCheckList = (item) => {
    for (let i = this.checklist.length - 1; i >= 0; i--) {
      if (item === this.checklist[i]) {
        this.checklist.splice(i, 1);
        console.log(this.checklist);
      }
    }
  };

  setNotes = (notes) => {
    this.notes = notes;
  };

  setDone = (done) => {
    this.done = done;
  };
  */
}

Todo.prototype.getTitle = function() {
  return this.title;
};

Todo.prototype.getDueDate = function() {
  return this.dueDate;
};

Todo.prototype.getPriority = function() {
  return this.priority;
};

Todo.prototype.getDescription = function() {
  return this.description;
};

Todo.prototype.getChecklist = function() {
  return this.checklist;
};

Todo.prototype.getNotes = function() {
  return this.notes;
};

Todo.prototype.getDone = function() {
  return this.done;
};

Todo.prototype.getProject = function() {
  return this.project;
};

Todo.prototype.setTitle = function(title) {
  this.title = title;
};

Todo.prototype.setDescription = function(description) {
  this.description = description;
};

Todo.prototype.setDueDate = function(dueDate) {
  this.dueDate = dueDate;
};

Todo.prototype.setPriority = function(priority) {
  this.priority = priority;
};

Todo.prototype.setChecklist = function(checkList) {
  this.checklist = checkList;
};

Todo.prototype.setNotes = function(notes) {
  this.notes = notes;
};

Todo.prototype.setDone = function(done) {
  this.done = done;
};

Todo.prototype.setProject = function(project) {
  this.project = project;
};

Todo.prototype.addItemToChecklist = function(item) {
  if (item.trim() != '') {
    this.checklist.push(item);
    console.log(this.checklist);
  }
};

Todo.prototype.deleteItemFromCheckList = function(item) {
  for (let i = this.checklist.length - 1; i >= 0; i--) {
    if (item === this.checklist[i]) {
      this.checklist.splice(i, 1);
      console.log(this.checklist);
    }
  }
};


function compareDates(a, b) {
  let doneResult;
  if (a.getDone() === true) {
    if (b.getDone() === false) {
      doneResult = 1;
    } else {
      doneResult = 0;
    }
  } else {
    if (b.getDone() === true) {
      doneResult = -1;
    } else {
      doneResult = 0;
    }
  }
  if (doneResult === 0) {
    const dateResult = compareAsc(parseISO(a.getDueDate()), parseISO(b.getDueDate()));
    if (dateResult === 0) {
      let priorityResult;
      if (a.getPriority() === 'high') {
        switch (b.getPriority()) {
          case 'high':
            priorityResult = 0;
            break;
          default:
            priorityResult = -1;
        }
      } else if (a.getPriority() === 'medium') {
        switch (b.getPriority()) {
          case 'high':
            priorityResult = 1;
            break;
          case 'medium':
            priorityResult = 0;
            break;
          default:
            priorityResult = -1;
            break;
        }
      } else {
        switch (b.getPriority()) {
          case 'low':
            priorityResult = 0;
            break;
          default:
            priorityResult = 1;
            break;
        }
      }
      return priorityResult;
    } else {
      return dateResult;
    }
  } else {
    return doneResult;
  }
}

export {Todo, compareDates};


