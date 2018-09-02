import React from 'react';
import Loading from '../../../common/Loading';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { mapFirebaseCoursesToArray } from '../../../../mappings-from-firebase/MappingsFromFirebase';
import { Link } from 'react-router-dom';

const UserCourses = ({ user }) => {
  if (!user) {
    return <Loading />;
  }

  const { courses } = user;

  return (
    <Card>
      {mapFirebaseCoursesToArray(courses).map(course => (
        <Link to={`/courses/${course.id}`}>
          <CardContent>
            {course.name} | {course.description}
          </CardContent>
        </Link>
      ))}
    </Card>
  );
};

export default UserCourses;
