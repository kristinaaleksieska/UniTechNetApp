import database from '../../firebase/firebase';

const users = database.ref('users');
const courses = database.ref('courses');

export const startSetCoursesUserIsSubscribedTo = uid => dispatch =>
  users
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
    });
