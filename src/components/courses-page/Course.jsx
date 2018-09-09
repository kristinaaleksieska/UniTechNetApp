import React from 'react';
import {
	getCurrentUserDetails,
	getSubscribedUsersForCourse,
	getCourseById,
	isCurrentUserSubscribedToCourse
} from '../../selectors/firebaseSelectors';
import { subscribeToCourse, unsubscribeFromCourse } from '../../actions/courses/courses';
import Loading from '../common/Loading';
import Problem from './problems/Problem';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Modal from './users-subscribed-to-course/Modal';
import ProblemModalForm from './problems/ProblemModalForm';

const Container = styled.div`
	display: flex;
	padding-top: 20px;
	justify-content: center;
	flex-direction: column;
`;

const ActionContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: row;
`;
const CourseContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding-top: 30px;
`;
const CenteredDiv = styled.div`align-self: center;`;
const Actions = styled.div`
	margin-top: 10px;
	text-align: center;
`;

class Course extends React.Component {
	state = {
		isModalOpen: false,
		isAddProblemModalOpen: false
	};

	generateSubscribeButton = () => {
		const { isCurrentUserSubscribed } = this.props;
		const buttonText = isCurrentUserSubscribed ? 'UNSUBSCRIBE' : 'SUBSCRIBE';
		const buttonAction = isCurrentUserSubscribed ? this.unsubscribeFromCourse : this.subscribeToCourse;

		return (
			<Button onClick={buttonAction} variant="raised" color="primary">
				{buttonText}
			</Button>
		);
	};

	unsubscribeFromCourse = () => {
		this.props.unsubscribeFromCourse(this.props.currentUser.id, this.props.match.params.id);
	};
	subscribeToCourse = () => {
		this.props.subscribeToCourse(this.props.currentUser.id, this.props.match.params.id);
	};

	render() {
		const { course, subscribedUsers, isCurrentUserSubscribed, currentUser } = this.props;

		if (!course) {
			return <Loading />;
		}

		return (
			<CourseContainer>
				<Modal
					shouldBeOpen={this.state.isModalOpen}
					handleClose={() => this.setState({ isModalOpen: false })}
					users={subscribedUsers}
					currentUserId={currentUser.id}
				/>
				<ProblemModalForm
					shouldBeOpen={this.state.isAddProblemModalOpen}
					handleClose={() => this.setState({ isAddProblemModalOpen: false })}
					title="Add a problem"
					userId={currentUser.id}
					courseId={course.id}
				/>
				<Container>
					<h2 align="center">{course.name}</h2>

					<ActionContainer>
						<Actions>{this.generateSubscribeButton()}</Actions>
						<Actions>
							<Button variant="flat" color="primary" onClick={() => this.setState({ isModalOpen: true })}>
								VIEW MEMBERS
							</Button>
						</Actions>
						{isCurrentUserSubscribed && (
							<Actions>
								<Button
									variant="flat"
									color="primary"
									onClick={() => this.setState({ isAddProblemModalOpen: true })}
								>
									Add a problem
								</Button>
							</Actions>
						)}
					</ActionContainer>
				</Container>
				{!course.problems.length ? (
					<CenteredDiv>There are no problems available for this course</CenteredDiv>
				) : (
					<Container>
						{course.problems.map((courseProblem) => (
							<Problem
								courseId={course.id}
								key={courseProblem.id}
								id={courseProblem.id}
								{...courseProblem}
								currentUserId={currentUser.id}
								isCurrentUserSubscribed={isCurrentUserSubscribed}
							/>
						))}
					</Container>
				)}
			</CourseContainer>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const currentUser = getCurrentUserDetails(state);

	return {
		course: getCourseById(ownProps.match.params.id)(state),
		currentUser,
		subscribedUsers: getSubscribedUsersForCourse(ownProps.match.params.id)(state),
		isCurrentUserSubscribed:
			currentUser && isCurrentUserSubscribedToCourse(currentUser.id, ownProps.match.params.id)(state)
	};
};

const mapDispatchToProps = {
	subscribeToCourse,
	unsubscribeFromCourse
};

export default compose(firebaseConnect([ 'courses', 'users' ]), connect(mapStateToProps, mapDispatchToProps))(Course);
