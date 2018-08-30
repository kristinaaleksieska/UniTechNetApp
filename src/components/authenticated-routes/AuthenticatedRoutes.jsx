import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';

// Components
import Header from '../header/Header';

// Pages
import ProfilePage from '../profile-page/ProfilePage';
import Course from '../coursesPage/Course';
import CourseList from '../coursesPage/CoursesList';

class AuthenticatedRoutes extends React.Component {
  state = {
    drawerOpen: false,
  };

  toggleDrawerOpen = (isOpen) => () => {
    this.setState({
      drawerOpen: isOpen,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header title="Profile" onMenuButtonClick={this.toggleDrawerOpen} />
        <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawerOpen(false)}>
          dsafdshjkfadhjfashkfshdk
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
