import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import CourseListItem from './CourseListItem';
import Loading from '../common/CustomDatePicker';
import { getAllCourses } from '../../selectors/firebaseSelectors';
import { mapFirebaseCoursesToArray } from '../../mappings-from-firebase/MappingsFromFirebase';

const CourseList = ({ courses }) => {
  if (!courses) {
    return <Loading />;
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
