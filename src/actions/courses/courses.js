import database from '../../firebase/firebase';

export const subscribeToCourse = (uid, course) => dispatch =>
  database.ref(`courses/${course.name}/users/${uid}`).set(uid);
