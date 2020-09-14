import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { YearPage, NavBar, MonthPage } from './components';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='app'>
          <NavBar/>

          <Switch>
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
                <YearPage year={match.params.year}/>
              )
            }}/>

            <Route path='/year/:year/month/:month' exact render={({ match }) => {
              return (
                <MonthPage year={match.params.year} month ={match.params.month}/>
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
