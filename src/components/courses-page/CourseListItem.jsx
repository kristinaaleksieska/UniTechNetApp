import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import styled from 'styled-components';
import Input from '@material-ui/icons/Input';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const GoToCourseIcon = <Input />;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const CardContainer = styled.div`
	width: 33%;
	margin-left: 2px;
	margin-right: 2px;
`;

const CourseListItem = (props) => (
	<CardContainer>
		<Card>
			<CardHeader title={props.name} avatar={<Avatar aria-label="Course">{props.name[0]}</Avatar>} />
			<CardContent>{props.description}</CardContent>
			<ButtonContainer>
				<Link to={`/courses/${props.id}`}>
					<Button variant="flat" color="primary">
						{GoToCourseIcon}
					</Button>
				</Link>
			</ButtonContainer>
		</Card>
	</CardContainer>
);

export default CourseListItem;
