export const mapFirebaseCoursesToArray = (firebaseCourses) =>
	Object.keys(firebaseCourses).map((courseId) => ({
		id: courseId,
		name: firebaseCourses[courseId].name,
		description: firebaseCourses[courseId].description,
		problems: firebaseCourses[courseId].problems,
		subscribedUsers: firebaseCourses[courseId].subscribedUsers
	}));

export const mapFirebaseExperiencesToArray = (firebaseExperiences) =>
	Object.keys(firebaseExperiences).map((experienceId) => ({
		id: experienceId,
		company: firebaseExperiences[experienceId].company,
		jobTitle: firebaseExperiences[experienceId].jobTitle,
		startDate: firebaseExperiences[experienceId].startDate,
		endDate: firebaseExperiences[experienceId].endDate
	}));

export const mapFirebaseProblemsToArray = (firebaseProblems) =>
	Object.keys(firebaseProblems).map((problemId) => ({
		id: problemId,
		authorId: firebaseProblems[problemId].authorId,
		description: firebaseProblems[problemId].description,
		name: firebaseProblems[problemId].name
	}));

export const mapFirebaseUsersToArray = (firebaseUsers) =>
	Object.keys(firebaseUsers).map((firebaseUid) => ({
		id: firebaseUid,
		name: firebaseUsers[firebaseUid].name,
		surname: firebaseUsers[firebaseUid].surname,
		birthday: firebaseUsers[firebaseUid].birthday,
		gender: firebaseUsers[firebaseUid].gender,
		experiences: mapFirebaseExperiencesToArray(firebaseUsers[firebaseUid].experiences),
		courses: mapFirebaseCoursesToArray(firebaseUsers[firebaseUid].courses),
		title: firebaseUsers[firebaseUid].title,
		phoneNumber: firebaseUsers[firebaseUid].phoneNumber,
		profilePictureUrl: firebaseUsers[firebaseUid].profilePictureUrl,
		username: firebaseUsers[firebaseUid].username
	}));

export const mapSubscribedUsersToArray = (subscribedUsers) =>
	subscribedUsers ? Object.keys(subscribedUsers) : 'There are no subscribed users to this course';
