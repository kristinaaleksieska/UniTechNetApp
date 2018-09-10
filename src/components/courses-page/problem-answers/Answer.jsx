import React from 'react';
import { editAnswer, deleteAnswer, markAnswerAsCorrect } from '../../../actions/problems/answers/answers';
import { getUserDetailsById } from '../../../selectors/firebaseSelectors';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import AnswerForm from './AnswerForm';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

const EditIcon = <Edit />;

const DeleteIcon = <Delete />;

const CardContainer = styled.div`
	display: flex;
	justify-content: center;
	padding-top: 30px;
	margin: 0 auto;
`;

const AnswerContainer = styled.div`width: 90%;`;
const CardComponent = styled(Card)`
	${ifProp('isMarkedAsAnswer', css`border: 2px solid green;`)};
`;

class Answer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editable: false
		};
	}

	editAnswer = (answer) => {
		const { courseId, problemId } = this.props;
		console.log('edit', answer);
		this.props.editAnswer(courseId, problemId, answer);
		this.setState({ editable: false });
	};

	deleteAnswer = () => {
		const { courseId, problemId, answer } = this.props;
		this.props.deleteAnswer(courseId, problemId, answer.id);
	};

	markAsCorrect = () => {
		const { courseId, problemId, answer } = this.props;
		this.props.markAnswerAsCorrect(courseId, problemId, answer.id);
	};

	render() {
		const { currentUserLoggedIn, courseId, problemId, answer, authorDetails, isMarkedAsAnswer } = this.props;
		const { editable } = this.state;

		console.log(isMarkedAsAnswer);

		if (!currentUserLoggedIn || !courseId || !problemId || !answer || !authorDetails) {
			return null;
		}

		return (
			<AnswerContainer>
				{editable && (
					<AnswerForm userLoggedIn={currentUserLoggedIn} answer={answer} handleAction={this.editAnswer} />
				)}
				<CardContainer>
					<CardComponent
						isMarkedAsAnswer={isMarkedAsAnswer}
						style={{
							width: '100%'
						}}
					>
						<CardHeader
							title={`${authorDetails.name} ${authorDetails.surname}`}
							avatar={<Avatar aria-label="Answer">{authorDetails.name[0]}</Avatar>}
						/>
						<CardContent>{answer.description}</CardContent>
						{answer.author === currentUserLoggedIn.id && (
							<CardActions>
								<Button
									variant="flat"
									color="primary"
									onClick={() => this.setState({ editable: true })}
								>
									{EditIcon}
								</Button>
								<Button variant="flat" color="primary" onClick={this.deleteAnswer}>
									{DeleteIcon}
								</Button>
								<Button variant="flat" color="primary" onClick={this.markAsCorrect}>
									Mark as answer
								</Button>
							</CardActions>
						)}
					</CardComponent>
				</CardContainer>
			</AnswerContainer>
		);
	}
}

const mapDispatchToProps = {
	deleteAnswer,
	editAnswer,
	markAnswerAsCorrect
};
const mapStateToProps = (state, ownProps) => {
	return {
		authorDetails: getUserDetailsById(ownProps.answer.author)(state)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Answer);
