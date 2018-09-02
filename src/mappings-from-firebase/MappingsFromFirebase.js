export const mapFirebaseCoursesToArray = firebaseCourses =>
  Object.keys(firebaseCourses).map(courseId => ({
    id: courseId,
    name: firebaseCourses[courseId].name,
    description: firebaseCourses[courseId].description
  }));
