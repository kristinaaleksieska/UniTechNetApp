import React from 'react';
import database, { firebase } from '../../firebase/firebase';

export const addConnection = (uid, connectionUid) => dispatch =>
  firebase.ref(`users/${uid}/connections/${connectionUid}`).set(connectionUid);

export const removeConnection = (uid, connectionId) => dispatch =>
  firebase
    .ref(`users/${uid}/connections/${connectionId}`)
    .remove()
    .then(() => console.log('connection removed'))
    .catch(e => console.log(e));
