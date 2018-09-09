import { push } from 'connected-react-router';
import database, { firebase } from '../../firebase/firebase';

const setInitialUserInfos = (uid) => (dispatch) => {
	return database.ref('users').once('value').then((snapshot) => {
		var hasChildWithUid = snapshot.hasChild(uid);

		if (!hasChildWithUid) {
			database.ref('users/' + uid).set({
				name: '',
				surname: '',
				birthday: '1990-01-01',
				gender: '',
				title: '',
				id: uid,
				profilePictureUrl: '',
				username: '',
				phoneNumber: '',
				email: firebase.auth().currentUser.email
			});
		}
	});
};

export const loginWithEmailAndPassword = (email, password) => (dispatch) =>
	firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
		const uid = firebase.auth().currentUser.uid;
		dispatch(setInitialUserInfos(uid)).then(() => dispatch(push('/feed')));
	});
