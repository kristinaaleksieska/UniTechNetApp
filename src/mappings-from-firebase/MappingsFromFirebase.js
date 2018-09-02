export const mapFirebaseCoursesToArray = firebaseCourses =>
  Object.keys(firebaseCourses).map(courseId => ({
    id: courseId,
    name: firebaseCourses[courseId].name,
    description: firebaseCourses[courseId].description
  }));

export const mapFirebaseExperiencesToArray = firebaseExperiences =>
  Object.keys(firebaseExperiences).map(experienceId => ({
    id: experienceId,
    company: firebaseExperiences[experienceId].company,
    jobTitle: firebaseExperiences[experienceId].jobTitle,
    startDate: firebaseExperiences[experienceId].startDate,
    endDate: firebaseExperiences[experienceId].endDate
  }));
