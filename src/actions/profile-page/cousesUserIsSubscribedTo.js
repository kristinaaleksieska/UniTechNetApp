import database from '../../firebase/firebase';

const users = database.ref('users');
const courses = database.ref('courses');

const setCoursesUserIsSubscribedTo = courses => ({
  type: 'SET_COURSES_USER_IS_SUBSCRIBED_TO',
  coursesUserIsSubscibedTo
});

export const startSetCoursesUserIsSubscribedTo = uid => {
  return dispatch => {
    return users
      .ref(`${uid}/courses`)
      .once('value')
      .then(snapshot => {
        coursesUserIsSubscibedTo = [];
        snapshot.forEach(childSnapshot => {
          coursesUserIsSubscibedTo.push({
            id: courses.ref(childSnapshot.key),
            ...childSnapshot.val()
          });
        });
        dispatch(setCoursesUserIsSubscribedTo(coursesUserIsSubscibedTo));
      });
  };
};
