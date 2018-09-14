import database from '../../../firebase/firebase';
import moment from 'moment';

import { addNotification } from '../../notifications/notifications';

import { NEW_ANSWER_IN_PROBLEM } from '../../../constants/notifications';

export const addAnswer = (courseId, problemId, answer) => (dispatch) =>
	database
		.ref(`courses/${courseId}/problems/${problemId}/answers`)
		.push(answer)
		.then(async () => {
			const author = (await database.ref(`courses/${courseId}/problems/${problemId}/author`).once('value')).val();

			console.log(author);

			if (!author) {
				return;
			}

			const authorId = Object.keys(author)[0];

			dispatch(
				addNotification(NEW_ANSWER_IN_PROBLEM, authorId, {
					courseId,
					problemId,
					date: moment.utc().format()
				})
			);
		})
		.catch((e) => console.log(e));

export const editAnswer = (courseId, problemId, answer) => () => {
	database.ref(`courses/${courseId}/problems/${problemId}/answers/${answer.id}`).update({
		author: answer.author,
		date: answer.date,
		description: answer.description
	});
};

export const deleteAnswer = (courseId, problemId, answerId) => () => {
	return database.ref(`courses/${courseId}/problems/${problemId}/answers/${answerId}`).remove().then(() => {
		console.log('removed');
	});
};

export const markAnswerAsCorrect = (courseId, problemId, answerId) => () =>
	database.ref(`courses/${courseId}/problems/${problemId}/answerId`).set(answerId);
