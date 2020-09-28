import './monthPage.component.css';
import React, { Component } from 'react';
import { Month } from '..';
import { Link } from 'react-router-dom';

export default class monthPageComponent extends Component {
  render() {
    return (
      <div className='month-page'>
        <Link to={`/year/${this.props.year}/month/${Number(this.props.month )- 1}`}>
          <button type="button" className='monthBtn_prev'>&lang;</button>
        </Link>
        <div className='month-page'>
          <Month year={this.props.year} month={this.props.month}/>
        </div>
        <Link to={`/year/${this.props.year}/month/${Number(this.props.month) + 1}`}>
          <button type="button" className='monthBtn_next'>&rang;</button>
        </Link>
      </div>
    );
  }
}
