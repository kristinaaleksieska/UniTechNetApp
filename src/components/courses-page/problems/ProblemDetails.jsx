import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import ProblemModalForm from '../problems/ProblemModalForm';
import { deleteProblem, addProblem, editProblem } from '../../../actions/problems/problems';
import { addAnswer } from '../../../actions/problems/answers/answers';
import {
	getProblemByCourseAndProblemIds,
	getCurrentUserDetails,
	getAnswersByCourseAndProblemsId
} from '../../../selectors/firebaseSelectors';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AnswerForm from '../problem-answers/AnswerForm';
import Answer from '../problem-answers/Answer';

const ProblemContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding-top: 30px;
	width: 80%;
	margin: 0 auto;
`;

const AnswerContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const CardActionsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`;

class ProblemDetails extends React.Component {
	state = {
		isAddProblemModalOpen: false,
		shouldAddAnswer: false
	};

	deleteProblem = () => {
		const { problem, match: { params: { courseId } }, deleteProblem } = this.props;
		deleteProblem(courseId, problem.id);
	};

	addAnswer = (answer) => {
		const { problem, match: { params: { courseId } } } = this.props;
		this.props.addAnswer(courseId, problem.id, answer);
		this.setState({ shouldAddAnswer: false });
	};

	editProblem = (problem) => {
		const { match: { params: { courseId } } } = this.props;
		this.props.editProblem(courseId, problem);
	};

	render() {
		const { problem, currentUserDetails, courseAnswers, match: { params: { courseId } } } = this.props;
		if (!problem || !currentUserDetails || !courseAnswers) {
			return null;
		}
		return (
			<ProblemContainer>
				{problem.authorId === currentUserDetails.id && (
					<div>
						<ProblemModalForm
							shouldBeOpen={this.state.isAddProblemModalOpen}
							handleClose={() => this.setState({ isAddProblemModalOpen: false })}
							title="Edit problem"
							userId={problem.authorId}
							courseId={courseId}
							problem={problem}
							handleAction={this.editProblem}
							editMode
						/>
					</div>
				)}
				<Card>
					<CardHeader title={problem.name} />
					<CardContent>{problem.description}</CardContent>
					<CardActionsContainer>
						<CardActions>
							<Button
								variant="flat"
								color="primary"
								onClick={() => this.setState({ shouldAddAnswer: true })}
							>
								{' '}
								Add Answer
							</Button>
							{problem.authorId === currentUserDetails.id && (
								<div>
									<Button
										variant="flat"
										color="primary"
										onClick={() => this.setState({ isAddProblemModalOpen: true })}
									>
										Edit
									</Button>
									<Button variant="raised" color="primary" onClick={this.deleteProblem}>
										Delete
									</Button>
								</div>
							)}
						</CardActions>
					</CardActionsContainer>
				</Card>
				<div>
					{this.state.shouldAddAnswer && (
						<AnswerForm userLoggedIn={currentUserDetails} handleAction={this.addAnswer} />
					)}
				</div>
				<AnswerContainer>
					{courseAnswers.map((courseAnswer) => (
						<Answer
							answer={courseAnswer}
							currentUserLoggedIn={currentUserDetails}
							problemId={problem.id}
							courseId={courseId}
							key={courseAnswer.id}
							isMarkedAsAnswer={problem.answerId === courseAnswer.id}
						/>
					))}
				</AnswerContainer>
			</ProblemContainer>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { match: { params: { courseId, id } } } = ownProps;
	return {
		problem: getProblemByCourseAndProblemIds(courseId, id)(state),
		currentUserDetails: getCurrentUserDetails(state),
		courseAnswers: getAnswersByCourseAndProblemsId(courseId, id)(state)
	};
};

const mapDispatchToProps = {
	deleteProblem,
	addAnswer,
	editProblem
};

export default compose(firebaseConnect([ 'users', 'courses' ]), connect(mapStateToProps, mapDispatchToProps))(
	ProblemDetails
);
