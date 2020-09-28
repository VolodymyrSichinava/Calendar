import { find, pick } from 'lodash';
import React, { Component } from 'react';
import Todo from '../../models/todo.model';
import { todoService } from '../../services/todo.service';
import './dayPage.component.css';
let imgForm = require('../../images/form2.png');

export default class dayPageComponent extends Component {
  state  = {
    currentTodo: null,
    isFormVisible: false,
  }

  handleTitleChange = (event) => {
    this.setState({
      currentTodo: {
        ...this.state.currentTodo,
        title: event.target.value,
      }
    });
  }

  handleDescriptionChange = (event) => {
    this.setState({
      currentTodo: {
        ...this.state.currentTodo,
        description: event.target.value,
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    todoService.upsertTodo(pick(this.props, ['year', 'month', 'day']), this.state.currentTodo);
    this.setState({
      currentTodo: null,
      isFormVisible: false,
    })
  }

  handleReset = (event) => {
    alert('oxbcnbnm ajhve');
  }

  handleTodoClick = (event) => {
    const id = event.currentTarget.dataset.id;
    const currentTodo = find(this.props.todos, { id });
    this.setState({
      currentTodo,
      isFormVisible: true,
    });
  }

  handleAddButtonClick = () => {
    const currentTodo = new Todo();
    this.setState({
      currentTodo,
      isFormVisible: true,
    });
  }

  render() {
    const { year, month, day } = this.props;
    const today = new Date(year, month - 1, day);
    const title = today.toLocaleString('default', { weekday: 'long', day: 'numeric', month: 'long' });
    return (
      <div className='day-page'>
        <h2>{title}</h2>
        {this.props.todos.map(todo => (
          <div 
            key={todo.id} 
            className='todo-item' 
            onClick={this.handleTodoClick}
            data-id={todo.id}
          >
            <div>{todo.title}</div>
            <div>{todo.description}</div>
          </div>
        ))}
        { this.state.isFormVisible ?
          <form onSubmit={this.handleSubmit}>
            <p>Add Todos</p>
            <div className='todo-form'>
              {/* <img src={imgForm} className='imgForm' alt='Form'></img> */}
              <span>Title</span>
              <input
                type='text' 
                name='title' 
                value={this.state.currentTodo.title} 
                onChange={this.handleTitleChange}/>
              <span>Description</span>
              <input 
                type='text' 
                name='description' 
                value={this.state.currentTodo.description}
                onChange={this.handleDescriptionChange}/>
              <input
                type='submit'
                value='Submit'/>
            </div>
          </form> : <button onClick={this.handleAddButtonClick}>Add</button> }
      </div>
    );
  }
}
