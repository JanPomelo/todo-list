/* eslint-disable require-jsdoc */
import {todo1, todo2} from './todo';

class Project {
  constructor(name, todos = []) {
    this.name = name;
    this.todos = todos;
  }
}

const inbox = new Project('Inbox');

inbox.todos.push(todo1);
inbox.todos.push(todo2);

export {inbox};
