import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Input from '@material-ui/icons/Input';
import Delete from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import { deleteProblem } from '../../../actions/problems/problems';

import { getUserDetailsById, getCourseNameById } from '../../../selectors/firebaseSelectors';

const GoToProblemIcon = <Input />;

const DeleteIcon = <Delete />;

const CardContainer = styled.div`
	width: 90%;
	align-self: center;
	padding-top: 10px;
`;

const ElementContainer = styled.div`
	display: flex;
	align-self: flex-end;
`;

const ColumnContainer = styled.div`
  display: flex
  flex-direction: column;
  justify-content: flex-end;
`;

const Problem = (props) => {
	if (!props.createdBy) {
		return null;
	}

	const deleteProblem = () => {
		props.deleteProblem(props.courseId, props.id, props.fromFeed);
	};

	return (
		<CardContainer>
			<Card>
				<CardHeader title={props.name} avatar={<Avatar aria-label="Course">{props.name[0]}</Avatar>} />
				<CardContent>{props.description}</CardContent>
				<ColumnContainer>
					<ElementContainer>
						<i>
							Posted by: {props.createdBy.name} {props.createdBy.surname}
						</i>
					</ElementContainer>
					<ElementContainer>{props.withCourseName && <i>In: {props.courseName}</i>}</ElementContainer>
					<ElementContainer>
						{props.isCurrentUserSubscribed && (
							<React.Fragment>
								<Link to={`/courses/${props.courseId}/problems/${props.id}`}>
									<Button variant="flat" color="primary">
										{GoToProblemIcon}
									</Button>
								</Link>
								{props.authorId === props.currentUserId && (
									<Button color="primary" onClick={deleteProblem}>
										{DeleteIcon}
									</Button>
								)}
							</React.Fragment>
						)}
					</ElementContainer>
				</ColumnContainer>
			</Card>
		</CardContainer>
	);
};

const mapStateToProps = (state, ownProps) => ({
	createdBy: getUserDetailsById(ownProps.authorId)(state),
	courseName: getCourseNameById(ownProps.courseId)(state)
});

const mapDispatchToProps = {
	deleteProblem
};

export default connect(mapStateToProps, mapDispatchToProps)(Problem);
