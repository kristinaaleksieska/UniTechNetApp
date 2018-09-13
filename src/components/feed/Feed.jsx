import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { firebaseConnect } from 'react-redux-firebase';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Problem from '../courses-page/problems/Problem';

import {
	getAllProblemsFromSubscribedCoursesByUserId,
	userLoggedIn,
	getUnseenNotificationsById
} from '../../selectors/firebaseSelectors';

const Container = styled.div`
	display: flex;
	padding-top: 20px;
	justify-content: center;
	flex-direction: column;
`;

const CenteredDiv = styled.div`align-self: center;`;

class Feed extends React.Component {
	state = {
		showNotificationSnackbar: false,
		notificationCloseClicked: false
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			showNotificationSnackbar: nextProps.notifications.length > 0 && !prevState.notificationCloseClicked
		};
	}

	handleNotificationBarClose = () => {
		this.setState({
			showNotificationSnackbar: false,
			notificationCloseClicked: true
		});
	};

	onShowNotifications = () => {
		this.props.history.push('/notifications');
	};

	render() {
		const { problems, currentUserId, notifications } = this.props;
		const notificationMessage = `You have ${notifications.length} new notifications`;
		return (
			<Container>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left'
					}}
					open={this.state.showNotificationSnackbar}
					autoHideDuration={6000}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">{notificationMessage}</span>}
					action={[
						<Button key="undo" color="primary" size="small" onClick={this.onShowNotifications}>
							Show
						</Button>,
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							onClick={this.handleNotificationBarClose}
						>
							<CloseIcon />
						</IconButton>
					]}
				/>
				{!problems.length ? (
					<CenteredDiv>There are no problems available for this user</CenteredDiv>
				) : (
					<Container>
						{problems.map((courseProblem) => (
							<Problem
								courseId={courseProblem.courseId}
								key={courseProblem.id}
								id={courseProblem.id}
								{...courseProblem}
								currentUserId={currentUserId}
								isCurrentUserSubscribed
								withCourseName
								fromFeed
							/>
						))}
					</Container>
				)}
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	const currentUserId = userLoggedIn(state);
	return {
		currentUserId,
		problems: currentUserId ? getAllProblemsFromSubscribedCoursesByUserId(currentUserId)(state) : [],
		notifications: getUnseenNotificationsById(currentUserId)(state)
	};
};

export default compose(firebaseConnect([ 'courses', 'users' ]), connect(mapStateToProps))(Feed);
