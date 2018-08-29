import { push } from 'connected-react-router';
import { firebase } from '../../firebase/firebase';

import { setInitialUserInfos } from '../profile-page/loggingInActions';

export const loginWithEmailAndPassword = (email, password) => dispatch =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      const uid = firebase.auth().currentUser.uid;
      dispatch(setInitialUserInfos(uid)).then(() => dispatch(push('/profilepage')));
    });