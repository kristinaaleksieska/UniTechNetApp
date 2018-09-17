import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { markNotificationAsRead } from '../../actions/notifications/notifications';
import Loading from '../common/Loading';
import styled from 'styled-components';
import { NEW_MESSAGE, NEW_ANSWER_IN_PROBLEM, NEW_PROBLEM_IN_COURSE } from '../../constants/notifications';

import {
	getUserDetailsById,
	getCourseNameById,
	getProblemByCourseAndProblemIds
} from '../../selectors/firebaseSelectors';

const NotificationContainer = styled.div`
    display: flex;
    width: 80%
    margin-top: 20px;
	cursor: pointer;
	
	@keyframes highlight {
		from { background: transparent };
		to { background: rgba(244, 67, 45, 0.25) };
	}

	&:hover {
		animation-name: highlight;
		animation-duration: 0.5s;
		background: rgba(244, 67, 45, 0.25);
	}
`;

const Selectors = {
	NEW_MESSAGE: getUserDetailsById,
	NEW_PROBLEM_IN_COURSE: getCourseNameById,
	NEW_ANSWER_IN_PROBLEM: getProblemByCourseAndProblemIds
};

const getPayloadForNotification = (notification, state) => {
	if (!notification || !notification.type) {
		return null;
	}

	const selector = Selectors[notification.type];

	switch (notification.type) {
		case NEW_MESSAGE:
			const userDetails = selector(notification.senderId)(state);
			return userDetails ? `${userDetails.firstName} ${userDetails.lastName}` : '';
		case NEW_PROBLEM_IN_COURSE:
			const courseName = selector(notification.courseId)(state);
			return courseName || '';
		case NEW_ANSWER_IN_PROBLEM:
			const problem = selector(notification.courseId, notification.problemId)(state);
			return problem ? problem.name : '';
		default:
			return null;
	}
};

const Messages = {
	NEW_MESSAGE: (senderName) => `You have a new message from ${senderName}`,
	NEW_ANSWER_IN_PROBLEM: (problemName) => `You have a new answer in ${problemName}`,
	NEW_PROBLEM_IN_COURSE: (courseName) => `There is a new problem in ${courseName}`
};

const Notification = ({ notification, onNotificationClick, userId, markNotificationAsRead, sender, payload }) => {
	if (!notification || !userId) {
		return <Loading />;
	}

	const getParameterForMessage = () => {};

	const getMessage = () => {
		return Messages[notification.type](payload);
	};

	const getAvatar = () => {
		if (notification.type === NEW_MESSAGE) {
			return (
				<Avatar src={sender.profilePictureUrl} alt={sender.firstName[0]}>
					{!sender.profilePictureUrl && sender.firstName[0]}
				</Avatar>
			);
		}
		return <Avatar> </Avatar>;
	};

	const handleNotification = () => {
		markNotificationAsRead(notification.id, userId);
		onNotificationClick(notification);
	};

	return (
		<NotificationContainer onClick={handleNotification}>
			<CardHeader avatar={getAvatar()} title={getMessage()} />
		</NotificationContainer>
	);
};

const mapStateToProps = (state, ownProps) => {
	const { notification } = ownProps;

	const sender = notification.type === NEW_MESSAGE ? getUserDetailsById(notification.senderId)(state) : null;

	let props = {
		payload: getPayloadForNotification(notification, state)
	};

	if (sender) {
		props = { ...props, sender };
	}

	return props;
};

const mapDispatchToProps = { markNotificationAsRead };

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
