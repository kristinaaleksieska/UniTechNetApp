import _find from 'lodash/find';
import _orderBy from 'lodash/orderBy';
import _reverse from 'lodash/reverse';
import moment from 'moment';

const getFirebaseState = state => state.firebase;

const getFirebaseData = state => getFirebaseState(state).data;

export const getUsers = state => getFirebaseData(state).users;

export const getFirebaseAuthDetails = state => getFirebaseState(state).auth;

export const isFirebaseUserLoggedIn = state =>
  !getFirebaseAuthDetails(state).isEmpty;

export const userLoggedIn = state => getFirebaseState(state).auth.uid;

export const getUserDetailsById = id => state =>
  getUsers(state) && (getUsers(state)[id] || null);

export const getCurrentUserDetails = state => {
  const currentUserUid = userLoggedIn(state);
  const users = getUsers(state);

  if (!users) {
    return null;
  }

  return users[currentUserUid];
};

const getAllCourses = state => getFirebaseData(state).courses;

export const getAllCoursesAsArray = state => {
  const allCourses = getAllCourses(state);

  if (!allCourses) {
    return [];
  }

  return Object.keys(allCourses).map(courseId => ({
    id: courseId,
    name: allCourses[courseId].name,
    description: allCourses[courseId].description,
    problems: allCourses[courseId].problems,
    subscribedUsers: allCourses[courseId].subscribedUsers
  }));
};

export const getCourseById = courseId => state => {
  const allCourses = getAllCourses(state);

  if (!allCourses) {
    return null;
  }

  const course = allCourses[courseId];

  if (!course) {
    return null;
  }

  const courseProblems = course.problems
    ? Object.keys(course.problems).map(problemId => ({
        id: problemId,
        authorId: mapAuthor(course.problems[problemId].author),
        description: course.problems[problemId].description,
        name: course.problems[problemId].name,
        date: course.problems[problemId].date,
        answers: course.problems[problemId].answers,
        answerId: course.problems[problemId].answerId
      }))
    : [];

  return { ...course, problems: courseProblems, id: courseId };
};

export const getCourseNameById = courseId => state =>
  getCourseById(courseId)(state) ? getCourseById(courseId)(state).name : '';

const getCourseProblemsByCourseId = courseId => state => {
  const course = getCourseById(courseId)(state);

  if (!course) {
    return [];
  }

  const { problems } = course;

  if (!problems || !problems.length) {
    return [];
  }

  return problems;
};

export const getCoursesCurrentUserIsSubscribedTo = state =>
  getCurrentUserDetails(state).courses;

export const getSubscribedUsersForCourse = courseId => state => {
  const allCourses = getAllCourses(state);

  if (!allCourses) {
    return [];
  }

  const currentCourse = allCourses[courseId];

  if (!currentCourse) {
    return [];
  }

  const { subscribedUsers } = currentCourse;

  if (!subscribedUsers) {
    return [];
  }

  return Object.keys(subscribedUsers).map(userId => ({
    id: userId,
    ...getUserDetailsById(userId)(state)
  }));
};

export const isCurrentUserSubscribedToCourse = (userId, courseId) => state =>
  _find(
    getSubscribedUsersForCourse(courseId)(state),
    user => user.id === userId
  ) != null;

export const areUsersConnected = (uid1, uid2) => state => {
  const firstUserDetails = getUserDetailsById(uid1)(state);

  if (!firstUserDetails || !firstUserDetails.connections) {
    return false;
  }

  return Object.keys(firstUserDetails.connections).indexOf(uid2) !== -1;
};

export const getAllProblemsFromSubscribedCoursesByUserId = userId => state => {
  const userDetails = getUserDetailsById(userId)(state);

  if (!userDetails) {
    return [];
  }

  const userCourseIds = userDetails.courses
    ? Object.keys(userDetails.courses)
    : [];

  if (!userCourseIds.length) {
    return [];
  }

  const allProblemsForUser = userCourseIds.reduce((problems, course) => {
    const problemsWithCourseId = getCourseProblemsByCourseId(course)(state).map(
      problem => ({
        ...problem,
        courseId: course
      })
    );
    return [...problemsWithCourseId, ...problems];
  }, []);

  return _orderBy(
    allProblemsForUser,
    [problem => moment.utc(problem.date).valueOf()],
    ['desc']
  );
};

export const getProblemByCourseAndProblemIds = (
  courseId,
  problemId
) => state => {
  const problemsByCourse = getCourseProblemsByCourseId(courseId)(state);

  if (!problemsByCourse || !problemsByCourse.length) {
    return null;
  }

  const problem = _find(problemsByCourse, problem => problem.id === problemId);

  if (!problem) {
    return null;
  }

  return problem;
};

export const getAnswersByCourseAndProblemsId = (
  courseId,
  problemId
) => state => {
  const problem = getProblemByCourseAndProblemIds(courseId, problemId)(state);

  if (!problem) {
    return null;
  }

  const { answers } = problem;

  const problemAnswers = answers
    ? Object.keys(answers).map(answerId => ({
        id: answerId,
        author: mapAuthor(answers[answerId].author),
        description: answers[answerId].description,
        date: answers[answerId].date
      }))
    : [];
  return _orderBy(
    problemAnswers,
    [answer => moment.utc(answer.date).valueOf()],
    ['asc']
  );
};

const mapAuthor = author => Object.keys(author)[0];

export const getAuthorIdOfAComment = (
  courseId,
  problemId,
  answerId
) => state => {
  const problemAnsweres = getAnswersByCourseAndProblemsId(courseId, problemId)(
    state
  );
  const answer = problemAnsweres[answerId];

  return answer.author.id;
};

export const getConnectionsForUser = state => {
  const uid = userLoggedIn(state);
  const user = getUserDetailsById(uid)(state);

  if (!user) {
    return [];
  }

  const { connections } = user;
  if (!connections) {
    return [];
  }

  return Object.keys(connections).map(connectionId =>
    getUserDetailsById(connectionId)(state)
  );
};

export const getMessagesFromChat = connectionUserId => state => {
  const currentUserId = userLoggedIn(state);

  const currentUserDetails = getUserDetailsById(currentUserId)(state);

  if (!currentUserDetails) {
    return [];
  }

  const { chat } = currentUserDetails;
  if (!chat || !chat[connectionUserId]) {
    return [];
  }

  const { messages } = chat[connectionUserId];
  if (!messages) {
    return [];
  }

  const messageArray = Object.keys(messages).map(messageId => ({
    ...messages[messageId],
    id: messageId
  }));

  return _orderBy(
    messageArray,
    [message => moment.utc(message.sentDate).valueOf()],
    ['asc']
  );
};

export const getNotificationsForUserById = id => state => {
  const user = getUserDetailsById(id)(state);

  if (!user) {
    return [];
  }

  const { notifications } = user;

  if (!notifications) {
    return [];
  }

  return _reverse(
    Object.keys(notifications).map(notificationId => ({
      ...notifications[notificationId],
      id: notificationId
    }))
  );
};

export const getUnseenNotificationsById = id => state =>
  getNotificationsForUserById(id)(state).filter(
    notification => !notification.seen
  );
