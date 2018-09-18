import database from '../../firebase/firebase';

export const startUpdateGeneralInfo = generalInfo => dispatch => {
  database.ref(`users/${generalInfo.id}`).update(generalInfo);
};
