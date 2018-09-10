import database from '../../../firebase/firebase';

export const addAnswer = (courseId, problemId, answer) => (dispatch) =>
	database
		.ref(`courses/${courseId}/problems/${problemId}/answers`)
		.push(answer)
		.then(() => console.log('pushed'))
		.catch((e) => console.log(e));

export const editAnswer = (courseId, problemId, answer) => () =>
	database.ref(`courses/${courseId}/problems/${problemId}/answers/${answer.id}`).update(answer);

export const deleteAnswer = (courseId, problemId, answerId) => () => {
	console.log(answerId);
	return database.ref(`courses/${courseId}/problems/${problemId}/answers/${answerId}`).remove().then(() => {
		console.log('removed');
	});
};

export const markAnswerAsCorrect = (courseId, problemId, answerId) => () =>
	database.ref(`courses/${courseId}/problems/${problemId}/answerId`).set(answerId);
