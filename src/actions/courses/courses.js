import database from '../../firebase/firebase';
import { addConnection } from '../user/connectionActions';
const databaseCourse = async (courseid) => await database.ref(`courses/${courseid}`).once('value');

export const subscribeToCourse = (uid, courseid, subscribedUserIds) => async () => {
	const course = (await databaseCourse(courseid)).val();

	await Promise.all(
		subscribedUserIds.map((subscribedUserId) => {
			return addConnection(uid, subscribedUserId);
		})
	);
	return database.ref(`courses/${courseid}/subscribedUsers/${uid}`).set(true).then(() =>
		database.ref(`users/${uid}/courses/${courseid}`).set({
			courseId: courseid,
			description: course.description,
			name: course.name
		})
	);
};
export const unsubscribeFromCourse = (uid, courseid) => (dispatch) =>
	database
		.ref(`courses/${courseid}/subscribedUsers/${uid}`)
		.remove()
		.then(() => database.ref(`users/${uid}/courses/${courseid}`).remove().then(() => console.log('unsubscribed')))
		.catch((e) => console.log(e));
