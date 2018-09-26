import React from 'react';
import Loading from '../../../common/Loading';
import { mapFirebaseEducationToArray } from '../../../../mappings-from-firebase/MappingsFromFirebase';
import UserEducation from './UserEducation';
import AddEducation from './AddEducation';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

const CardContainer = styled.div`margin-bottom: 10px;`;

const ListUserExperiences = ({ user }) => {
	if (!user) {
		return <Loading />;
	}
	const { educations } = user;

	if (!educations) {
		return (
			<Card>
				<CardContent>You have not added education.</CardContent>
				<AddEducation />
			</Card>
		);
	}

	return (
		<CardContainer>
			<Card>
				<CardHeader title="Education" avatar={<Avatar aria-label="Education">E</Avatar>} />
				<CardContent>
					{mapFirebaseEducationToArray(educations)
						.sort((a, b) => a.startDate < b.startDate)
						.map((education) => <UserEducation key={education.id} education={education} />)}
				</CardContent>
				<AddEducation />
			</Card>
		</CardContainer>
	);
};

export default ListUserExperiences;
