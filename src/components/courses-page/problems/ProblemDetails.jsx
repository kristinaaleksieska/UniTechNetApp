import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import ProblemModalForm from '../problems/ProblemModalForm';
import { deleteProblem } from '../../../actions/problems/problems';
import { getProblemByCourseAndProblemIds, userLoggedIn } from '../../../selectors/firebaseSelectors';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const ProblemContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding-top: 30px;
	width: 80%;
	margin: 0 auto;
`;

class ProblemDetails extends React.Component {
	state = {
		isAddProblemModalOpen: false
	};

	deleteProblem = () => {
		const { problem, currentUserId, match: { params: { courseId } }, deleteProblem } = this.props;
		deleteProblem(courseId, problem.id);
	};

	render() {
		const { problem, currentUserId, match: { params: { courseId } } } = this.props;
		if (!problem || !currentUserId) {
			return null;
		}

		return (
			<ProblemContainer>
				{problem.authorId === currentUserId && (
					<div>
						<ProblemModalForm
							shouldBeOpen={this.state.isAddProblemModalOpen}
							handleClose={() => this.setState({ isAddProblemModalOpen: false })}
							title="Add a problem"
							userId={problem.authorId}
							courseId={courseId}
							problem={problem}
							editMode
						/>
					</div>
				)}
				<Card>
					<CardHeader title={problem.name} />
					<CardContent>{problem.description}</CardContent>
					{problem.authorId === currentUserId && (
						<CardActions>
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
						</CardActions>
					)}
				</Card>
			</ProblemContainer>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { match: { params: { courseId, id } } } = ownProps;
	return {
		problem: getProblemByCourseAndProblemIds(courseId, id)(state),
		currentUserId: userLoggedIn(state)
	};
};

const mapDispatchToProps = {
	deleteProblem
};

export default compose(firebaseConnect([ 'users', 'courses' ]), connect(mapStateToProps, mapDispatchToProps))(
	ProblemDetails
);
