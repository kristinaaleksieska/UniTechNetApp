import database from '../../firebase/firebase';

export const updateExperience = (uid, experience) => dispatch => {
  console.log(experience);
  experience.endDate = experience.endDate ? experience.endDate : '';
  experience.company = experience.company ? experience.company : '';
  experience.startDate = experience.startDate ? experience.startDate : '';
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
    .then(ref => {
      updateExperience(uid, {...experience, id: ref.key})
    });
};
