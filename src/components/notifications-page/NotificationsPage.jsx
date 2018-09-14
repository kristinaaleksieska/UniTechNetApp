import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { markAllNotificationsAsRead } from '../../actions/notifications/notifications';
import { getNotificationsForUserById, userLoggedIn } from '../../selectors/firebaseSelectors';
import { NEW_MESSAGE, NEW_PROBLEM_IN_COURSE, NEW_ANSWER_IN_PROBLEM } from '../../constants/notifications';

import Notification from './Notification';

import styled from 'styled-components';

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: 20px;
`;

const NotificationsPage = ({ notifications, history, markAllNotificationsAsRead, currentUserId }) => {
	const unseenNotifications = notifications.filter((notification) => !notification.seen);
	const seenNotifications = notifications.filter((notification) => notification.seen);

	const onNotificationClick = (notification) => {
		if (notification.type === NEW_MESSAGE) {
			history.push(`/messenger/${notification.senderId}`);
		} else {
			history.push(`/courses/${notification.courseId}/problems/${notification.problemId}`);
		}
	};

	return (
		<div>
			<ButtonContainer>
				<Button
					variant="raised"
					color="primary"
					onClick={() => {
						markAllNotificationsAsRead(currentUserId);
					}}
				>
					Mark all as read
				</Button>
			</ButtonContainer>
			<h3>New notifications</h3>
			<div>
				{unseenNotifications.map((notification) => (
					<Notification
						userId={currentUserId}
						notification={notification}
						onNotificationClick={onNotificationClick}
					/>
				))}
			</div>
			<h4>Previous notifications</h4>
			<div>
				{seenNotifications.map((notification) => (
					<Notification
						userId={currentUserId}
						notification={notification}
						onNotificationClick={(notification) => console.log('hehe')}
					/>
				))}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	const currentUserId = userLoggedIn(state);

	return {
		currentUserId,
		notifications: getNotificationsForUserById(currentUserId)(state)
	};
};

const mapDispatchToProps = {
	markAllNotificationsAsRead
};

const composer = compose(firebaseConnect([ 'users' ]), connect(mapStateToProps, mapDispatchToProps));

export default composer(NotificationsPage);
