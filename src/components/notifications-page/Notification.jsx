import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import { markNotificationAsRead } from '../../actions/notifications/notifications';
import Loading from '../common/Loading';
import styled from 'styled-components';
import { NEW_MESSAGE, NEW_PROBLEM_IN_COURSE, NEW_ANSWER_IN_PROBLEM } from '../../constants/notifications';

const NotificationContainer = styled.div`
    display:flex;
    width: 80%
    margin-top:20px;
    cursor: pointer;
`;

const Notification = ({ notification, onNotificationClick, userId, markNotificationAsRead }) => {
	if (!notification || !userId) {
		return <Loading />;
	}

	const getMessage = () => {
		if (notification.type === NEW_MESSAGE) {
			return 'You have a new message. To see it click on this notification';
		} else if (notification.type === NEW_ANSWER_IN_PROBLEM) {
			return 'Somebody posted an answer to your problem. Click here to go and check it out';
		} else {
			return 'There is a new problem you might know the answer to. Click here to see it';
		}
	};

	const handleNotification = () => {
		markNotificationAsRead(notification.id, userId);
		onNotificationClick(notification);
	};

	return (
		<NotificationContainer onClick={handleNotification}>
			<Card>
				<CardContent> {getMessage()} </CardContent>
			</Card>
		</NotificationContainer>
	);
};
const mapDispatchToProps = { markNotificationAsRead };

export default connect(null, mapDispatchToProps)(Notification);
