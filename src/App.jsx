/* eslint-disable */
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import withAuthentication from './auth/withAuthentication';
import LogInPage from './components/login-page/LogInPage';
import AuthenticatedRoutes from './components/authenticated-routes/AuthenticatedRoutes';
import 'react-dates/lib/css/_datepicker.css';

export const history = createHistory();

const App = () => (
  <div className="App">
    <Router history={history}>
      <Switch>
        <Route path="/login" component={LogInPage} exact />
        <Route path="/" component={withAuthentication(AuthenticatedRoutes)} />
        <Redirect to="/profilepage" />
      </Switch>
    </Router>
  </div>
);

export default App;
