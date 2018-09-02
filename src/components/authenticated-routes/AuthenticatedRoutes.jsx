import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { history } from '../../store/configureStore';
// Components
import Header from '../header/Header';

// Pages
import ProfilePage from '../profile-page/ProfilePage';
import Course from '../courses-page/Course';
import CourseList from '../courses-page/CoursesList';

class AuthenticatedRoutes extends React.Component {
  state = {
    drawerOpen: false
  };

  toggleDrawerOpen = isOpen => () => {
    this.setState({
      drawerOpen: isOpen
    });
  };

  goToCourses = () => {
    history.push('/courses');
  };

  render() {
    return (
      <React.Fragment>
        <Header title="Profile" onMenuButtonClick={this.toggleDrawerOpen} />
        <Drawer
          open={this.state.drawerOpen}
          onClose={this.toggleDrawerOpen(false)}
        >
          <Button onClick={this.goToCourses} color="primary" variant="flat">
            Courses
          </Button>
        </Drawer>
        <Switch>
          <Route exact path="/profilepage" component={ProfilePage} />
          <Route exact path="/courses/:id" component={Course} />
          <Route exact path="/courses" component={CourseList} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default AuthenticatedRoutes;
