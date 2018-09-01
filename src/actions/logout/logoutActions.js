import database, { firebase } from '../../firebase/firebase';

export const logout = () => dispatch =>
  firebase
    .auth()
    .signOut()
    .then(() => console.log('Signed out'))
    .catch(err => console.log(err));
