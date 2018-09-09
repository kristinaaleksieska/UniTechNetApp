import database from '../../firebase/firebase';
const databaseCourse = async (courseid) => await database.ref(`courses/${courseid}`).once('value');

export const subscribeToCourse = (uid, courseid) => async () => {
	const course = (await databaseCourse(courseid)).val();
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
