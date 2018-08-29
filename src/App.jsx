/* eslint-disable */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { history } from './store/configureStore';
import withAuthentication from './auth/withAuthentication';
import LogInPage from './components/login-page/LogInPage';
import AuthenticatedRoutes from './components/authenticated-routes/AuthenticatedRoutes';
import 'react-dates/lib/css/_datepicker.css';

import theme from './theme/theme';

const muiTheme = createMuiTheme({
  palette: {
    primary: red,
    secondary: {
      main: '#fff',
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <MuiThemeProvider theme={muiTheme}>
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route path="/login" component={LogInPage} exact />
            <Route path="/" component={withAuthentication(AuthenticatedRoutes)} />
            <Redirect to="/profilepage" />
          </Switch>
        </Router>
      </div>
    </MuiThemeProvider>
  </ThemeProvider>
);

export default App;
