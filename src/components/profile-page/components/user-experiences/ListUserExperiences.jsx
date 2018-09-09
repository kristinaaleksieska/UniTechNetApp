import React from 'react';
import Loading from '../../../common/Loading';
import { mapFirebaseExperiencesToArray } from '../../../../mappings-from-firebase/MappingsFromFirebase';
import UserExperience from './UserExperience';
import AddExperience from './AddExperience';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

const ListUserExperiences = ({ user }) => {
	if (!user) {
		return <Loading />;
	}
	const { experiences } = user;

	if (!experiences) {
		return <div>You have no experiences</div>;
	}

	return (
		<Card>
			<CardHeader title="Experience" avatar={<Avatar aria-label="Experiences">E</Avatar>} />
			<CardContent>
				{mapFirebaseExperiencesToArray(experiences)
					.sort((a, b) => a.startDate < b.startDate)
					.map((experience) => <UserExperience key={experience.id} experience={experience} />)}
			</CardContent>
			<AddExperience />
		</Card>
	);
};

export default ListUserExperiences;
