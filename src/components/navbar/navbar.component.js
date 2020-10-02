import './navbar.component.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavbarComponent extends Component {
  render() {
    return (
      <div className='navbar'>
        <Link to='/year/current'>
          <div className='current_year'>Current Year</div>
        </Link>
        <Link to='/year/current/month/current'>
          <div className='current_month'>Current Month</div>
        </Link>
        <Link to='/today'>
          <div className='current_today'>Today</div>
        </Link>
      </div>
    );
  }
}
