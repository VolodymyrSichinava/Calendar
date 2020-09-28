import './yearPage.component.css';
import React, { Component } from 'react';
import { Month} from '..';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

export default class YearComponent extends Component {
  render() {
    const months =  Array(12).fill(null).map((x, index) => index + 1);
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
          {months.map(month => (
            <Month 
              key={month} 
              year={this.props.year}
              month={month}
              todos={get(this.props.todos, month, {})}/>
          ))}
        </div>
      </div>
    );
  }
}
