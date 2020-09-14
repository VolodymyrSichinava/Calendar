import './year.component.css';
import React, { Component } from 'react';
import { Month} from '..';
import { Link } from 'react-router-dom';

export default class YearComponent extends Component {
  render() {
    const months =  Array(12).fill(null).map((x, index) => new Date(this.props.year, index, 1));
    return (
      <div className="App">
        <div className='year'>
          <Link to={`/year/${Number(this.props.year) - 1}`}>
          <button type="button" className='btn_year prev'>&lang;</button>
          </Link>
          {this.props.year}
          <Link to={`/year/${Number(this.props.year) + 1}`}>
            <button type="button" className='btn_year next'>&rang;</button>
          </Link>
        </div>
        <div className='list_month'>
          {months.map(startDate => (
            <Month key={startDate.toISOString()} startDate={startDate}/>
          ))}
        </div>
      </div>
    );
  }
}
