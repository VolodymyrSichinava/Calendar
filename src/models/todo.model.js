export default class Todo {
  title = 'No title';
  description = '';
  createdAt = (new Date()).toISOString();
  activeAt = '';
  state = 'created';
  constructor(options) {
    Object.assign(this, options);
  }
}
