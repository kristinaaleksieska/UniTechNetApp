import _find from 'lodash/find';
import _orderBy from 'lodash/orderBy';
import moment from 'moment';

const getFirebaseState = (state) => state.firebase;

const getFirebaseData = (state) => getFirebaseState(state).data;

export const getUsers = (state) => getFirebaseData(state).users;

export const getFirebaseAuthDetails = (state) => getFirebaseState(state).auth;

export const isFirebaseUserLoggedIn = (state) => !getFirebaseAuthDetails(state).isEmpty;

export const userLoggedIn = (state) => getFirebaseState(state).auth.uid;

export const getUserDetailsById = (id) => (state) => getUsers(state) && (getUsers(state)[id] || null);

export const getCurrentUserDetails = (state) => {
	const currentUserUid = userLoggedIn(state);
	const users = getUsers(state);

	if (!users) {
		return null;
	}

	return users[currentUserUid];
};

const getAllCourses = (state) => getFirebaseData(state).courses;

export const getAllCoursesAsArray = (state) => {
	const allCourses = getAllCourses(state);

	if (!allCourses) {
		return [];
	}

	return Object.keys(allCourses).map((courseId) => ({
		id: courseId,
		name: allCourses[courseId].name,
		description: allCourses[courseId].description,
		problems: allCourses[courseId].problems,
		subscribedUsers: allCourses[courseId].subscribedUsers
	}));
};

export const getCourseById = (courseId) => (state) => {
	const allCourses = getAllCourses(state);

	if (!allCourses) {
		return null;
	}

	const course = allCourses[courseId];

	if (!course) {
		return null;
	}

	const courseProblems = course.problems
		? Object.keys(course.problems).map((problemId) => ({
				id: problemId,
				authorId: course.problems[problemId].authorId,
				description: course.problems[problemId].description,
				name: course.problems[problemId].name,
				date: course.problems[problemId].date
			}))
		: [];

	return { ...course, problems: courseProblems, id: courseId };
};

export const getCourseNameById = (courseId) => (state) =>
	getCourseById(courseId)(state) ? getCourseById(courseId)(state).name : '';

const getCourseProblemsByCourseId = (courseId) => (state) => {
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

export const getCoursesCurrentUserIsSubscribedTo = (state) => getCurrentUserDetails(state).courses;

export const getSubscribedUsersForCourse = (courseId) => (state) => {
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

	return Object.keys(subscribedUsers).map((userId) => ({ id: userId, ...getUserDetailsById(userId)(state) }));
};

export const isCurrentUserSubscribedToCourse = (userId, courseId) => (state) =>
	_find(getSubscribedUsersForCourse(courseId)(state), (user) => user.id === userId) != null;

export const areUsersConnected = (uid1, uid2) => (state) => {
	const firstUserDetails = getUserDetailsById(uid1)(state);

	if (!firstUserDetails || !firstUserDetails.connections) {
		return false;
	}

	return Object.keys(firstUserDetails.connections).indexOf(uid2) !== -1;
};

export const getAllProblemsFromSubscribedCoursesByUserId = (userId) => (state) => {
	const userDetails = getUserDetailsById(userId)(state);

	if (!userDetails) {
		return [];
	}

	const userCourseIds = userDetails.courses ? Object.keys(userDetails.courses) : [];

	if (!userCourseIds.length) {
		return [];
	}

	const allProblemsForUser = userCourseIds.reduce((problems, course) => {
		const problemsWithCourseId = getCourseProblemsByCourseId(course)(state).map((problem) => ({
			...problem,
			courseId: course
		}));
		return [ ...problemsWithCourseId, ...problems ];
	}, []);

	return _orderBy(allProblemsForUser, [ (problem) => moment.utc(problem.date).valueOf() ], [ 'desc' ]);
};

export const getProblemByCourseAndProblemIds = (courseId, problemId) => (state) => {
	const problemsByCourse = getCourseProblemsByCourseId(courseId)(state);

	if (!problemsByCourse || !problemsByCourse.length) {
		return null;
	}

	const problem = _find(problemsByCourse, (problem) => problem.id === problemId);

	if (!problem) {
		return null;
	}

	return problem;
};
