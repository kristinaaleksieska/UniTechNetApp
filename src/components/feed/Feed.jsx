import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { firebaseConnect } from 'react-redux-firebase';

import Problem from '../courses-page/problems/Problem';

import { getAllProblemsFromSubscribedCoursesByUserId, userLoggedIn } from '../../selectors/firebaseSelectors';

const Container = styled.div`
	display: flex;
	padding-top: 20px;
	justify-content: center;
	flex-direction: column;
`;

const CenteredDiv = styled.div`align-self: center;`;

const Feed = ({ problems, currentUserId }) => (
	<Container>
		{!problems.length ? (
			<CenteredDiv>There are no problems available for this user</CenteredDiv>
		) : (
			<Container>
				{problems.map((courseProblem) => (
					<Problem
						courseId={courseProblem.courseId}
						key={courseProblem.id}
						id={courseProblem.id}
						{...courseProblem}
						currentUserId={currentUserId}
						isCurrentUserSubscribed
						withCourseName
						fromFeed
					/>
				))}
			</Container>
		)}
	</Container>
);

const mapStateToProps = (state) => {
	const currentUserId = userLoggedIn(state);
	return {
		currentUserId,
		problems: currentUserId ? getAllProblemsFromSubscribedCoursesByUserId(currentUserId)(state) : []
	};
};

export default compose(firebaseConnect([ 'courses', 'users' ]), connect(mapStateToProps))(Feed);
