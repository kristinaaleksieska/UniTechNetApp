import database from '../../firebase/firebase';

export const subscribeToCourse = (uid, courseid) => (dispatch) => {
	return database.ref(`courses/${courseid}/subscribedUsers/${uid}`).set(true);
};
export const unsubscribeFromCourse = (uid, courseid) => (dispatch) =>
	database
		.ref(`courses/${courseid}/subscribedUsers/${uid}`)
		.remove()
		.then(() => console.log('subscribtion removed'))
		.catch((e) => console.log(e));
