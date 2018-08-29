import database from '../../firebase/firebase';

export const startSubsriptionToCourse = (uid, course) => {
  return dispatch => {
    return database.ref(`courses/${course.name}/users/${uid}`).set(uid);
  };
};
