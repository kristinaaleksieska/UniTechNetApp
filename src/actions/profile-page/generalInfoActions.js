import database from '../../firebase/firebase';

const setGeneralInfo = generalInfo => ({
  type: 'SET_GENERAL_INFO',
  generalInfo
});

export const startSetGeneralInfo = uid => {
  return dispatch => {
    return database
      .ref(`users/${uid}`)
      .once('value')
      .then(snapshot => {
        const generalInfo = {
          id: uid,
          ...snapshot.val()
        };
        dispatch(setGeneralInfo(generalInfo));
        console.log('geninfo = ' + generalInfo.name + ' ' + generalInfo.gender);
      });
  };
};

const updateGeneralInfo = generalInfo => ({
  type: 'UPDATE_GENERAL_INFO',
  generalInfo
});

export const startUpdateGeneralInfo = generalInfo => {
  return dispatch => {
    return database
      .ref(`users/${generalInfo.id}`)
      .update(generalInfo)
      .then(() => {
        dispatch(updateGeneralInfo(generalInfo));
      });
  };
};
