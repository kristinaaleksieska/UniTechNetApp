import React from 'react';
import { connect } from 'react-redux';
import CourseListItem from './CourseListItem';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { getAllCourses } from '../../selectors/firebaseSelectors';

const mapFirebaseCoursesToArray = firebaseCourses =>
  Object.keys(firebaseCourses).map(courseId => ({
    id: courseId,
    name: firebaseCourses[courseId].name,
    description: firebaseCourses[courseId].description
  }));

const CourseList = ({ courses }) => {
  if (!courses) {
    return null;
  }

  const courseArray = mapFirebaseCoursesToArray(courses);

  return (
    <div>
      {courseArray.length === 0 ? (
        <p>No courses</p>
      ) : (
        courseArray.map(course => {
          return <CourseListItem key={course.id} {...course} id={course.id} />;
        })
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  courses: getAllCourses(state)
});

export default compose(
  firebaseConnect(['courses']),
  connect(mapStateToProps)
)(CourseList);
