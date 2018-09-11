import database from '../../firebase/firebase';

export const addNotification = (type, userId, payload) => () =>
	database.ref(`users/${userId}/notifications`).push({
		type,
		...payload
	});
