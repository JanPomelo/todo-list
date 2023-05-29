/* eslint-disable require-jsdoc */
import {todo1} from './todo';

class Project {
  constructor(name, todos = []) {
    this.name = name;
    this.todos = todos;
  }
}

const inbox = new Project('Inbox');

inbox.todos.push(todo1);

export {inbox};
