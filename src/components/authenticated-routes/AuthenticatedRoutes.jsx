import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import Header from '../header/Header';

// Pages
import ProfilePage from '../profile-page/ProfilePage';
import Course from '../coursesPage/Course';
import CourseList from '../coursesPage/CoursesList';

const AuthenticatedRoutes = () => (
  <React.Fragment>
    <Header />
    <Switch>
      <Route exact path="/profilepage" component={ProfilePage} />
      <Route exact path="/courses/:id" component={Course} />
      <Route exact path="/courses" component={CourseList} />
    </Switch>
  </React.Fragment>
);

export default AuthenticatedRoutes;
