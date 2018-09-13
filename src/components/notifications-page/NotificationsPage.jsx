import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { markAllNotificationsAsRead } from '../../actions/notifications/notifications';
import { getNotificationsForUserById, userLoggedIn } from '../../selectors/firebaseSelectors';
import { NEW_MESSAGE, NEW_PROBLEM_IN_COURSE, NEW_ANSWER_IN_PROBLEM } from '../../constants/notifications';

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
			<Button
				variant="rais(ed"
				color="primary"
				onClick={() => {
					markAllNotificationsAsRead(currentUserId);
				}}
			>
				Mark all as read
			</Button>
			<p>New notifications</p>
			<div>
				{unseenNotifications.map((notification) => (
					<p onClick={() => onNotificationClick(notification)}>{notification.type}</p>
				))}
			</div>
			<p>Previous notifications</p>
			<div>{seenNotifications.map((notification) => <p>{notification.type}</p>)}</div>
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
