import { findIndex, get } from "lodash";

const TODO_LOCAL_STORAGE_KEY = 'TODO_LOCAL_STORAGE_KEY';

class TodoService extends EventTarget {
  todos = {};

  constructor() {
    super();
    this._subscribe();
  }

  handleStorageEvent = (e) => {
    this._loadFromLocalStorage();
    this.dispatchUpdate();
  }

  load() {
    this._loadFromLocalStorage();
    return this.todos;
  }

  _loadFromLocalStorage() {
    const stringData = localStorage.getItem(TODO_LOCAL_STORAGE_KEY);
    const todoData = JSON.parse(stringData) || {};
    this.todos = todoData;
  }

  _saveToLocalStorage() {
    this._unsubscribe();
    localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(this.todos));
    this._subscribe();
  }

  save() {
    this._saveToLocalStorage();
  }

  upsertTodo({ year, month, day }, todo) {
    const dayTodos = Array.from(get(this.todos, [year, month, day], []));
    const todoIndex = findIndex(dayTodos, { id: todo.id });

    if (todoIndex > -1) {
      dayTodos[todoIndex] = todo;
    } else {
      dayTodos.push(todo);
    }

    this.todos = {
      ...this.todos,
      [year]: {
        ...get(this.todos, [year], {}),
        [month]: {
          ...get(this.todos, [year, month], {}),
          [day]: dayTodos,
        }
      }
    }
    this.save();
    this.dispatchUpdate();
  }

  deleteTodo({ year, month, day}, todo) {
    const dayTodos = Array.from(get(this.todos, [year, month, day], []));
    const todoIndex = findIndex(dayTodos, { id: todo.id });
    dayTodos.splice(todoIndex, 1);
    
    this.todos = {
      ...this.todos,
      [year]: {
        ...get(this.todos, [year], {}),
        [month]: {
          ...get(this.todos, [year, month], {}),
          [day]: dayTodos,
        }
      }
    }
    this.save();
    this.dispatchUpdate();
  }

  dispatchUpdate() {
    this.dispatchEvent(new CustomEvent('update', { detail: this.todos }));
  }

  _subscribe() {
    window.addEventListener('storage', this.handleStorageEvent);
  }

  _unsubscribe() {
    window.removeEventListener('storage', this.handleStorageEvent);
  }
}

export const todoService = new TodoService();
