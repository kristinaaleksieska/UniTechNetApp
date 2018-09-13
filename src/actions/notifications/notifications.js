import database from '../../firebase/firebase';

import { getUnseenNotificationsById } from '../../selectors/firebaseSelectors';

export const addNotification = (type, userId, payload) => () =>
	database.ref(`users/${userId}/notifications`).push({
		type,
		...payload
	});

export const markNotificationAsRead = (notificationId, userId) => () =>
	database.ref(`users/${userId}/notifications/${notificationId}/seen`).set(true);

export const markAllNotificationsAsRead = (userId) => (dispatch, getState) => {
	const unseenNotifications = getUnseenNotificationsById(userId)(getState());

	unseenNotifications
		.map((notification) => notification.id)
		.forEach((notificationId) => dispatch(markNotificationAsRead(notificationId, userId)));
};
