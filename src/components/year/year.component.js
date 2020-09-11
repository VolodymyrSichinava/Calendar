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
      year: this.state.year + 1,
    })
  }

  render() {
    YEAR = this.state.year;

    return (
      <div className="App">
        <div className='year'>
          <button type="button" onClick={this.buttonPrevClickHandler}>Prev</button>
          {this.state.year}
          <button type="button" onClick={this.buttonNextClickHandler}>Next</button>
        </div>
        <div className='list_month'>
          {this.state.months.map(month => <Month number={month.number} startDate={month.startDate}/>)}
        </div>
      </div>
    );
  }
}