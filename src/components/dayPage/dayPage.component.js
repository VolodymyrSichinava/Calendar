import React, { Component } from 'react';
import './dayPage.component.css';
let imgForm = require('../../images/form2.png');

export default class dayPageComponent extends Component {
  state  = {
    title: 'sample',
    description: 'sample description',
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }
  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div className='day-page'>
        {this.props.startDate.toISOString()}
        <form onSubmit={this.handleSubmit}>
          <p>Add Todos</p>
          <div className='todo-form'>
            <img src={imgForm} className='imgForm' alt='Form'></img>
            <span>Title</span>
            <input
              type='text' 
              name='title' 
              value={this.state.title} 
              onChange={this.handleTitleChange}/>
            <span>Description</span>
            <input 
              type='text' 
              name='description' 
              value={this.state.description}
              onChange={this.handleDescriptionChange}/>
            <input
              type='submit'
              value='Submit'/>
          </div>
        </form>
      </div>
    );
  }
}
