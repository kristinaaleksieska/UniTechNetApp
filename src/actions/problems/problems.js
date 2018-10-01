import database from '../../firebase/firebase';
import { push } from 'connected-react-router';
import moment from 'moment';
import { getCourseById } from '../../selectors/firebaseSelectors';

import { addNotification } from '../notifications/notifications';

import { NEW_PROBLEM_IN_COURSE } from '../../constants/notifications';

export const addProblem = (courseId, problem) => (dispatch, getState) =>
  database
    .ref(`courses/${courseId}/problems`)
    .push(problem)
    .then(problemReference => {
      const course = getCourseById(courseId)(getState());

      if (!course) {
        return;
      }

      const subscribedUsers = Object.keys(course.subscribedUsers);

      const authorId = Object.keys(problem.author)[0];

      subscribedUsers.filter(user => user !== authorId).forEach(user => {
        dispatch(
          addNotification(NEW_PROBLEM_IN_COURSE, user, {
            courseId,
            problemId: problemReference.key,
            date: moment
              .utc()
              .add(2, 'hours')
              .format()
          })
        );
      });
    })
    .catch(e => console.log(e));

export const editProblem = (courseId, problem) => () => {
  if (!problem.answers) {
    delete problem['answers'];
  }
  console.log('editiram sega', problem);
  database.ref(`courses/${courseId}/problems/${problem.id}`).update(problem);
};

export const deleteProblem = (
  courseId,
  problemId,
  fromFeed = false
) => dispatch =>
  database
    .ref(`courses/${courseId}/problems/${problemId}`)
    .remove()
    .then(() => {
      if (!fromFeed) {
        dispatch(push(`/courses/${courseId}`));
      }
    });
