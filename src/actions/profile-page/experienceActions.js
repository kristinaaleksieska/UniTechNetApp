import database from '../../firebase/firebase';

export const updateExperience = (uid, experience) => dispatch => {
  database.ref(`users/${uid}/experiences/${experience.id}`).update(experience);
};

export const removeExperience = (uid, experienceId) => dispatch =>
  database
    .ref(`users/${uid}/experiences/${experienceId}`)
    .remove()
    .then(() => console.log('connection removed'))
    .catch(e => console.log(e));

export const addExperience = (uid, experience) => dispatch => {
  database
    .ref(`users/${uid}/experiences`)
    .push(experience)
    .then(ref => {});
};
