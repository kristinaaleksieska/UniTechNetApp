import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Input from '@material-ui/icons/Input';
import Avatar from '@material-ui/core/Avatar';

const GoToProblemIcon = <Input />;

const CardContainer = styled.div`width: 90%;`;

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
	const subscribeToCourse = () => {};

	return (
		<CardContainer>
			<Card>
				<CardHeader title={props.name} avatar={<Avatar aria-label="Course">{props.name[0]}</Avatar>} />
				<CardContent>{props.description}</CardContent>
				<ColumnContainer>
					<ElementContainer>
						<i>
							Posted by: {props.author.firstName} {props.author.lastName}
						</i>
					</ElementContainer>
					<ElementContainer>
						<Link to={`/courses/${props.courseId}/problems/${props.id}`}>
							<Button variant="flat" color="primary">
								{GoToProblemIcon}
							</Button>
						</Link>
					</ElementContainer>
				</ColumnContainer>
			</Card>
		</CardContainer>
	);
};
const mapDispatchToProps = {};
const mapStateToProps = {};
export default Problem;
