import React from 'react';
import Loading from '../../../common/Loading';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { mapFirebaseCoursesToArray } from '../../../../mappings-from-firebase/MappingsFromFirebase';
import { Link } from 'react-router-dom';
import UserCourse from './UserCourse';

const ListUserCourses = ({ user }) => {
	if (!user) {
		return <Loading />;
	}

	const { courses } = user;

	return (
		<Card>
			<CardHeader title="Course" avatar={<Avatar aria-label="Experiences">C</Avatar>} />
			{courses &&
				mapFirebaseCoursesToArray(courses).map((course) => (
					<CardContent key={course.id}>
						<UserCourse key={course.id} course={course} />
					</CardContent>
				))}
		</Card>
	);
};

export default ListUserCourses;
