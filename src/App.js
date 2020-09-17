import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { YearPage, NavBar, MonthPage, DayPage } from './components';
import { todoService } from './services/todo.service';

export default class App extends Component {

  state = {
    todos: todoService.load(),
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ todos: [1] })
    }, 3000);
  }

  render() {
    console.log(this.state.todos);
    return (
      <Router>
        <div className='app'>
          <NavBar/>

          <Switch>

            <Route path='/' exact render={() => {
              const today = new Date();
              const redirectPath = `/year/${today.getFullYear()}`;
              return (<Redirect to={redirectPath}/>);
            }}/>

            <Route path='/year/current' exact render={() => {
              const today = new Date();
              const redirectPath = `/year/${today.getFullYear()}`;
              return (<Redirect to={redirectPath}/>);
            }}/>

            <Route path='/year/current/month/current' exact render={() => {
              const today = new Date();
              const redirectPath = `/year/${today.getFullYear()}/month/${today.getMonth() + 1}`;
              return (<Redirect to={redirectPath}/>);
            }}/>

            <Route path='/year/:year' exact render={({ match }) => {
              return (
                <YearPage year={match.params.year} todos={this.state.todos}/>
              )
            }}/>

            <Route path='/year/:year/month/:month' exact render={({ match }) => {
              return (
                <MonthPage year={match.params.year} month ={match.params.month}/>
              )
            }}/>

            <Route path='/year/:year/month/:month/day/:day' exact render={({ match }) => {
              return (
                <DayPage startDate={new Date(
                  Number(match.params.year),
                  Number(match.params.month) - 1,
                  Number(match.params.day))
                }/>
              )
            }}/>

            <Route path='/today' exact render={() => {
              const today = new Date();
              const redirectPath = `/year/${today.getFullYear()}`;
              return (<Redirect to={redirectPath}/>);
            }
            }/>
          </Switch>
          
        </div>
      </Router>
    );
  }
}
