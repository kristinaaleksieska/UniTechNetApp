import React from 'react';
import database, { firebase } from '../../firebase/firebase';

export const addConnection = (uid, connectionUid) => dispatch =>
  database
    .ref(`users/${uid}/connections/${connectionUid}`)
    .set(connectionUid)
    .then(() =>
      database.ref(`users/${connectionUid}/connections/${uid}`).set(uid)
    );

export const removeConnection = (uid, connectionId) => dispatch =>
  database
    .ref(`users/${uid}/connections/${connectionId}`)
    .remove()
    .then(() =>
      database.ref(`users/${connectionId}/connections/${uid}`).remove()
    )
    .catch(e => console.log(e));
