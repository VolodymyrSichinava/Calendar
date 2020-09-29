import { find, pick } from 'lodash';
import React, { Component } from 'react';
import Todo from '../../models/todo.model';
import { todoService } from '../../services/todo.service';
import './dayPage.component.css';


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
    });
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

  handleDeleteButtonClick = (event) => {
    event.preventDefault();
    todoService.deleteTodo(pick(this.props, ['year', 'month', 'day']), this.state.currentTodo);
    this.setState({
      currentTodo: null,
      isFormVisible: false,
    });
  }

  render() {
    const { year, month, day } = this.props;
    const today = new Date(year, month - 1, day);
    const title = today.toLocaleString('default', { weekday: 'long', day: 'numeric', month: 'long' });
    const dayWeek = today.toLocaleString('en', { weekday: 'long' });
    let dayImg = require(`../../images/${dayWeek}.png`);
    return (
      <div className='day-page'>
        {/* <h2>{title}</h2> */}
        <img src={dayImg} className='dayImg' alt='dayImg'></img>
        {this.props.todos.map(todo => (
          <div 
            key={todo.id} 
            className='todo-item' 
            onClick={this.handleTodoClick}
            data-id={todo.id}
          >
            <div className='todo-index'>{this.props.todos.indexOf(todo) + 1}</div>
            <div>{todo.title}</div>
            <div>{todo.description}</div>
          </div>
        ))}
        { this.state.isFormVisible ?
          <form onSubmit={this.handleSubmit}>
            <p>Add Todos</p>
            <div className='todo-form'>
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
                value='&#10004; Submit'/>
              <button onClick={this.handleDeleteButtonClick}>&#10008; Delete</button>
            </div>
          </form> : <button className='button-add' onClick={this.handleAddButtonClick}>&#9997; Add Todos</button> }
      </div>
    );
  }
}
