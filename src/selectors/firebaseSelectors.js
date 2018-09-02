const getFirebaseState = state => state.firebase;

const getFirebaseData = state => getFirebaseState(state).data;

export const getUsers = state => getFirebaseData(state).users;

export const getFirebaseAuthDetails = state => getFirebaseState(state).auth;

export const isFirebaseUserLoggedIn = state =>
  !getFirebaseAuthDetails(state).isEmpty;

export const userLoggedIn = state => getFirebaseState(state).auth.uid;

export const getCurrentUserDetails = state => {
  const currentUserUid = userLoggedIn(state);
  const users = getUsers(state);

  if (!users) {
    return null;
  }

  return users[currentUserUid];
};

export const getAllCourses = state => getFirebaseData(state).courses;

export const getCoursesCurrentUserIsSubscribedTo = state =>
  getCurrentUserDetails(state).courses;
