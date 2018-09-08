import React from 'react';
import { getAllCourses, getUsers } from '../../selectors/firebaseSelectors';
import {
	mapFirebaseCoursesToArray,
	mapFirebaseProblemsToArray,
	mapSubscribedUsersToArray
} from '../../mappings-from-firebase/MappingsFromFirebase';
import { subscribeToCourse, unsubscribeFromCourse } from '../../actions/courses/courses';
import { getCurrentUserDetails } from '../../selectors/firebaseSelectors';
import Loading from '../common/Loading';
import Problem from './problems/Problem';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from './users-subscribed-to-course/Modal';

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
	constructor(props) {
		super(props);

		this.state = {
			isSubscribed: false,
			isModalOpen: false,
			currentUser: props.currentUser
		};
	}

	generateSubscribeButton = () => {
		const { isSubscribed } = this.state;
		const buttonText = isSubscribed ? 'UNSUBSCRIBE' : 'SUBSCRIBE';
		const buttonAction = isSubscribed ? this.unsubscribeFromCourse : this.subscribeToCoursee;

		return (
			<Button onClick={buttonAction} variant="raised" color="primary">
				{buttonText}
			</Button>
		);
	};

	unsubscribeFromCourse = () => {
		console.log(this.props.params.id);
		this.props.unsubscribeFromCourse(this.state.currentUser.key, this.props.match.params.id);
	};
	subscribeToCoursee = () => {
		console.log(this.props.match.params.id);
		this.props.subscribeToCourse(this.state.currentUser.id, this.props.match.params.id);
	};

	render() {
		const { courses } = this.props;

		if (!courses) {
			return <Loading />;
		}

		const course = mapFirebaseCoursesToArray(courses).find((course) => course.id === this.props.match.params.id);
		const users = mapSubscribedUsersToArray(course.subscribedUsers);

		const courseProblems = course.problems
			? mapFirebaseProblemsToArray(course.problems)
			: 'There are no problems for this course';

		return (
			<CourseContainer>
				<Container>
					<h2 align="center">{course.name}</h2>

					<ActionContainer>
						<Actions>{this.generateSubscribeButton()}</Actions>
						<Actions>
							<Button variant="flat" color="primary" onClick={() => this.setState({ isModalOpen: true })}>
								VIEW MEMBERS
							</Button>
						</Actions>
					</ActionContainer>
					{this.state.isModalOpen && (
						<Modal
							shouldBeOpen={this.state.isModalOpen}
							handleClose={() => this.setState({ isModalOpen: false })}
							users={users}
						/>
					)}
				</Container>
				{!Array.isArray(courseProblems) ? (
					<CenteredDiv>{courseProblems}</CenteredDiv>
				) : (
					<Container>
						{courseProblems.map((courseProblem) => (
							<Problem key={courseProblem.id} id={courseProblem.id} {...courseProblem} />
						))}
					</Container>
				)}
			</CourseContainer>
		);
	}
}

const mapStateToProps = (state) => ({
	courses: getAllCourses(state),
	currentUser: getCurrentUserDetails(state),
	users: getUsers(state)
});

const mapDispatchToProps = {
	subscribeToCourse,
	unsubscribeFromCourse
};

export default compose(firebaseConnect([ 'courses', 'users' ]), connect(mapStateToProps, mapDispatchToProps))(Course);
