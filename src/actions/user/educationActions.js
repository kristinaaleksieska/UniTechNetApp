import database from '../../firebase/firebase';

export const updateEducation = (uid, education) => (dispatch) => {
	education.endDate = education.endDate ? education.endDate : '';
	database.ref(`users/${uid}/educations/${education.id}`).update(education);
};

export const removeEducation = (uid, educationId) => (dispatch) =>
	database
		.ref(`users/${uid}/educations/${educationId}`)
		.remove()
		.then(() => console.log('education removed'))
		.catch((e) => console.log(e));

export const addEducation = (uid, education) => (dispatch) => {
	database.ref(`users/${uid}/educations`).push(education).then((ref) => {
		updateEducation(uid, { ...education });
	});
};
