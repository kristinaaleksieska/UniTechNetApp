import React from 'react';
import Loading from '../../../common/Loading';
import { mapFirebaseExperiencesToArray } from '../../../../mappings-from-firebase/MappingsFromFirebase';
import UserExperience from './UserExperience';
import Card from '@material-ui/core/Card';

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
      {mapFirebaseExperiencesToArray(experiences).map(experience => (
        <UserExperience experience={experience} />
      ))}
    </Card>
  );
};
export default ListUserExperiences;
