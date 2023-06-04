/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
class Todo {
  constructor(title, dueDate, priority, description, checklist = '', notes = '', done = 'false') {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;
    this.notes = notes;
    this.done = done;
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

  getDone = () => {
    return this.done;
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

  setDone = (done) => {
    this.done = done;
  };
}

const todo1 = new Todo('Todo erstellen', 'today', 'high');

const todo2 = new Todo(
    'Todo loeschen',
    'today',
    'high',
    'Todo loeschen halt ne',
);

const logTodo1 = () => {
  console.log(todo1);
};

export {Todo, todo1, todo2, logTodo1};


