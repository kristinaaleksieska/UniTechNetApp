import database from '../../firebase/firebase';

export const setInitialUserInfos = uid => {
  return dispatch => {
    return database
      .ref('users')
      .once('value')
      .then(snapshot => {
        let doesExist = false;
        snapshot.forEach(childSnapshot => {
          if (childSnapshot.key === uid) {
            doesExist = true;
          }
        });

        if (!doesExist) {
          database.ref('users/' + uid).set({
            name: '',
            surname: '',
            birthday: '',
            gender: ''
          });
        }
      });
  };
};
