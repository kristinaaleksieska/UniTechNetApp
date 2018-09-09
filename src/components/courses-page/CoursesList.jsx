import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import CourseListItem from './CourseListItem';
import Loading from '../common/CustomDatePicker';
import { getAllCoursesAsArray } from '../../selectors/firebaseSelectors';
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

	return (
		<TwoCardsContainer>
			{courses.length === 0 ? (
				<p>No courses</p>
			) : (
				courses.map((course) => <CourseListItem key={course.id} {...course} id={course.id} />)
			)}
		</TwoCardsContainer>
	);
};

const mapStateToProps = (state) => ({
	courses: getAllCoursesAsArray(state)
});

export default compose(firebaseConnect([ 'courses' ]), connect(mapStateToProps))(CourseList);
