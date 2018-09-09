import database from '../../firebase/firebase';
import { push } from 'connected-react-router';

export const addProblem = (courseId, problem) => () =>
	database.ref(`courses/${courseId}/problems`).push(problem).then(console.log('pushed')).catch((e) => console.log(e));

export const editProblem = (courseId, problem) => () =>
	database.ref(`courses/${courseId}/problems/${problem.id}`).update(problem);

export const deleteProblem = (courseId, problemId, fromFeed = false) => (dispatch) =>
	database.ref(`courses/${courseId}/problems/${problemId}`).remove().then(() => {
		if (!fromFeed) {
			dispatch(push(`/courses/${courseId}`));
		}
	});
