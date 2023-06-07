/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
class Todo {
  constructor(title, dueDate, priority, description, checklist = [], notes = '', done = 'false') {
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
}

const todo1 = new Todo('Todo erstellen', '2023-06-24', 'high');

const todo2 = new Todo(
    'Todo loeschen',
    '2023-06-14',
    'medium',
    'Todo loeschen halt ne',
);

const logTodo1 = () => {
  console.log(todo1);
};

export {Todo, todo1, todo2, logTodo1};


