export const mapFirebaseCoursesToArray = firebaseCourses =>
  Object.keys(firebaseCourses).map(courseId => ({
    id: courseId,
    name: firebaseCourses[courseId].name,
    description: firebaseCourses[courseId].description,
    problems: firebaseCourses[courseId].problems,
    subscribedUsers: firebaseCourses[courseId].subscribedUsers
  }));

export const mapFirebaseExperiencesToArray = firebaseExperiences =>
  Object.keys(firebaseExperiences).map(experienceId => ({
    id: experienceId,
    company: firebaseExperiences[experienceId].company,
    jobTitle: firebaseExperiences[experienceId].jobTitle,
    startDate: firebaseExperiences[experienceId].startDate,
    endDate: firebaseExperiences[experienceId].endDate
  }));

export const mapFirebaseEducationToArray = firebaseEducations =>
  Object.keys(firebaseEducations).map(educationId => ({
    id: educationId,
    grade: firebaseEducations[educationId].grade,
    school: firebaseEducations[educationId].school,
    degree: firebaseEducations[educationId].degree,
    startDate: firebaseEducations[educationId].startDate,
    endDate: firebaseEducations[educationId].endDate
  }));

export const mapFirebaseProblemsToArray = firebaseProblems =>
  Object.keys(firebaseProblems).map(problemId => ({
    id: problemId,
    authorId: Object.keys(firebaseProblems[problemId].author)[0],
    description: firebaseProblems[problemId].description,
    name: firebaseProblems[problemId].name
  }));

export const mapFirebaseUsersToArray = firebaseUsers =>
  Object.keys(firebaseUsers).map(firebaseUid => ({
    id: firebaseUid,
    firstName: firebaseUsers[firebaseUid].firstName,
    lastName: firebaseUsers[firebaseUid].lastName,
    birthday: firebaseUsers[firebaseUid].birthday,
    gender: firebaseUsers[firebaseUid].gender,
    experiences: mapFirebaseExperiencesToArray(
      firebaseUsers[firebaseUid].experiences
    ),
    courses: mapFirebaseCoursesToArray(firebaseUsers[firebaseUid].courses),
    title: firebaseUsers[firebaseUid].title,
    phoneNumber: firebaseUsers[firebaseUid].phoneNumber,
    profilePictureUrl: firebaseUsers[firebaseUid].profilePictureUrl,
    username: firebaseUsers[firebaseUid].username
  }));

export const mapSubscribedUsersToArray = subscribedUsers =>
  subscribedUsers
    ? Object.keys(subscribedUsers)
    : 'There are no subscribed users to this course';
