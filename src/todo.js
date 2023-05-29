/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
class Todo {
  constructor(title, description, dueDate, priority, checklist = '', notes = '') {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;
    this.notes = notes;
  }
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

  setNotes = (notes) => {
    this.notes = notes;
  };
}

const todo1 = new Todo('Todo erstellen', 'Hier in dem Skript ein Todo erstellen', 'today', 'high');

const logTodo1 = () => {
  console.log(todo1);
};

export {Todo, todo1, logTodo1};

