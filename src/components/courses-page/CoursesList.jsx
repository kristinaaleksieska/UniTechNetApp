import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import CourseListItem from './CourseListItem';
import Loading from '../common/CustomDatePicker';
import { getAllCourses } from '../../selectors/firebaseSelectors';
import { mapFirebaseCoursesToArray } from '../../mappings-from-firebase/MappingsFromFirebase';
import styled from 'styled-components';

const TwoCardsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-flow: wrap;
`;

const CourseList = ({ courses }) => {
  if (!courses) {
    return <Loading />;
  }

  const courseArray = mapFirebaseCoursesToArray(courses);

  return (
    <TwoCardsContainer>
      {courseArray.length === 0 ? (
        <p>No courses</p>
      ) : (
        courseArray.map(course => {
          return <CourseListItem key={course.id} {...course} id={course.id} />;
        })
      )}
    </TwoCardsContainer>
  );
};

const mapStateToProps = state => ({
  courses: getAllCourses(state)
});

export default compose(
  firebaseConnect(['courses']),
  connect(mapStateToProps)
)(CourseList);
