import React from 'react';
import { connect } from 'react-redux';
import CourseListItem from './CourseListItem';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

const CourseList = ({ courses }) => {
  const arrayCourses = [];
  Object.keys(courses).forEach(courseId => {
    arrayCourses.push({
      id: courseId,
      description: courses[courseId].description,
      name: courses[courseId].name
    });
  });

  return (
    <div>
      {arrayCourses.length === 0 ? (
        <p>No courses</p>
      ) : (
        arrayCourses.map(course => {
          return <CourseListItem key={course.id} {...course} id={course.id} />;
        })
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  generalInfo: state.generalInfo,
  courses: state.firebase.data.courses
});

export default compose(
  firebaseConnect(['courses']),
  connect(mapStateToProps)
)(CourseList);
