import database from '../../firebase/firebase';
import moment from 'moment';
import { getUserDetailsById, getCurrentUserDetails } from '../../selectors/firebaseSelectors';

import { addNotification } from '../notifications/notifications';

import { NEW_MESSAGE } from '../../constants/notifications';

export const initializeChat = (receiverId) => async (_, getState) => {
	const sender = getCurrentUserDetails(getState());

	const receiver = getUserDetailsById(receiverId)(getState());

	const firstName = await database
		.ref(`users/${sender.id}/chat/${receiver.id}/firstName`)
		.once('value')
		.then((value) => value.val());

	if (!firstName) {
		return database
			.ref(`users/${sender.id}/chat/${receiver.id}`)
			.set({
				firstName: receiver.firstName,
				lastName: receiver.lastName
			})
			.then(() => {
				return database.ref(`users/${receiver.id}/chat/${sender.id}`).set({
					firstName: sender.firstName,
					lastName: sender.lastName
				});
			});
	}
};

export const sendMessage = (senderId, receiverId, message) => (dispatch) => {
	const senderRef = database.ref(`users/${senderId}/chat/${receiverId}`);
	const receiverRef = database.ref(`users/${receiverId}/chat/${senderId}`);
	return senderRef
		.child(`messages`)
		.push(message)
		.then(senderRef.child(`lastMessage`).set(message))
		.then(() => receiverRef.child(`messages`).push(message))
		.then(() => receiverRef.child(`lastMessage`).set(message))
		.then(() =>
			dispatch(
				addNotification(NEW_MESSAGE, receiverId, {
					senderId,
					date: moment.utc().format()
				})
			)
		);
};
