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
import ProblemDetails from '../courses-page/problems/ProblemDetails';
import UserPage from '../profile-page/UserPage';
import Feed from '../feed/Feed';
import Messenger from '../messenger/Messenger';
import NotificationsPage from '../notifications-page/NotificationsPage';

class AuthenticatedRoutes extends React.Component {
	state = {
		drawerOpen: false
	};

	toggleDrawerOpen = (isOpen) => () => {
		this.setState({
			drawerOpen: isOpen
		});
	};

	goTo = (url) => () => history.push(url);

	render() {
		return (
			<React.Fragment>
				<Header onMenuButtonClick={this.toggleDrawerOpen} />
				<Drawer open={this.state.drawerOpen} onClose={this.toggleDrawerOpen(false)}>
					<Button onClick={this.goTo('/feed')} color="primary" variant="flat">
						Feed
					</Button>
					<Button onClick={this.goTo('/profilepage')} color="primary" variant="flat">
						ProfilePage
					</Button>
					<Button onClick={this.goTo('/courses')} color="primary" variant="flat">
						Courses
					</Button>
					<Button onClick={this.goTo('/messenger')} color="primary" variant="flat">
						Messenger
					</Button>
				</Drawer>
				<Switch>
					<Route exact path="/profilepage" component={ProfilePage} />
					<Route exact path="/courses/:id" component={Course} />
					<Route exact path="/courses" component={CourseList} />
					<Route path="/courses/:courseId/problems/:id" component={ProblemDetails} />
					<Route path="/users/:userId" component={UserPage} />
					<Route exact path="/feed" component={Feed} />
					<Route exact path="/messenger" component={Messenger} />
					<Route path="/messenger/:connectionId" component={Messenger} />
					<Route exact path="/notifications" component={NotificationsPage} />
				</Switch>
			</React.Fragment>
		);
	}
}

export default AuthenticatedRoutes;
