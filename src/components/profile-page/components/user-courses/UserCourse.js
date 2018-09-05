import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Edit from '@material-ui/icons/Edit';
import Input from '@material-ui/icons/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const GoToCourseIcon = <Input />;

const CourseContainer = styled.div`
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.38);
`;

const CourseWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const InfoContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const UserCourse = ({ course }) => (
  <CourseContainer>
    <CourseWrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%'
        }}
      >
        <Typography variant="title">{course.name}</Typography>
        <InfoContainer>
          <Typography variant="subheading">{course.description}</Typography>
        </InfoContainer>
      </div>
      <ButtonContainer>
        <Link to={`/courses/${course.id}`}>
          <Button
            onClick={console.log('gegegege')}
            variant="flat"
            color="primary"
          >
            {GoToCourseIcon}
          </Button>
        </Link>
      </ButtonContainer>
    </CourseWrapper>
  </CourseContainer>
);

export default UserCourse;
