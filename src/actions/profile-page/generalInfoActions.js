import database from '../../firebase/firebase';

export const startUpdateGeneralInfo = generalInfo => dispatch => {
  return database.ref(`users/${generalInfo.id}`).update(generalInfo);
};
