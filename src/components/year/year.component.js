import './year.component.css';
import React, { Component } from 'react';
import { Month} from '..';

export default class YearComponent extends Component {
  state = {
    currentYear: new Date().getFullYear(),
  };

  buttonPrevClickHandler = () => {
    this.setState({
      currentYear: this.state.currentYear - 1,
    })
  }
  buttonNextClickHandler = () => {
    this.setState({
      currentYear: this.state.currentYear + 1,
    })
  }

  render() {
    
    const months =  Array(12).fill(null).map((x, index) => {
      return (<Month startDate={new Date(this.state.currentYear, index, 1)}/>);
    });

    return (
      <div className="App">
        <div className='year'>
          <button type="button" onClick={this.buttonPrevClickHandler}>Prev</button>
          {this.state.currentYear}
          <button type="button" onClick={this.buttonNextClickHandler}>Next</button>
        </div>
        <div className='list_month'>
          {months}
        </div>
      </div>
    );
  }
}