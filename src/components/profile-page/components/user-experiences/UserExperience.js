import React from 'react';
import styled from 'styled-components';
import Edit from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const present = 'PRESENT';

const EditIcon = <Edit />;

const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ExperienceWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  align-content: space-around;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-align: center;
`;

const CircleButton = styled.div`
  border-radius: 100%;
`;

const UserExperience = ({ experience }) => (
  <ExperienceContainer>
    <ExperienceWrapper>
      <div>
        <Typography variant="headline">{experience.jobTitle}</Typography>
        <InfoContainer>
          <Typography variant="subheading">{experience.company}</Typography>
          <Typography variant="caption">
            {experience.startDate} -{' '}
            {experience.endDate ? experience.endDate : present}
          </Typography>
        </InfoContainer>
      </div>
      <CircleButton>
        <Button
          onClick={console.log('gegegege')}
          variant="raised"
          color="primary"
        >
          {EditIcon}
        </Button>
      </CircleButton>
    </ExperienceWrapper>
  </ExperienceContainer>
);

export default UserExperience;
