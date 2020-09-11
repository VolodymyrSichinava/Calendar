import React, { Component } from 'react';

export default class MonthComponent extends Component {

  state = {
    number: 0,
  }

  componentDidMount() {
  }

  buttonClickHandler = (e) => {
    this.setState({
      number: this.state.number + 1,
    });
  }

  render() {

    const title = this.props.startDate.toLocaleString('default', { month: 'long' })

    return (
    <div className='month'>{title} {this.state.number}
      <button type='button' onClick={this.buttonClickHandler}>Button</button>
    </div>
    )
  }

} 