const getFirebaseState = state => state.firebase;

export const getFirebaseAuthDetails = state => getFirebaseState(state).auth;

export const isFirebaseUserLoggedIn = state =>
  !getFirebaseAuthDetails(state).isEmpty;

export const userLoggedIn = state =>
  getFirebaseState(state).auth.currentUser.uid;
