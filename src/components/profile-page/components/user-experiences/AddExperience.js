import React from 'react';
import CustomDatePicker from '../../../common/CustomDatePicker';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Done from '@material-ui/icons/Done';

const DoneIcon = <Done />;

const AddOrEditExperience = styled.div`
  margin-top: 10px;
  flex-wrap: wrap;
`;

const TwoTextFieldsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextFieldContainer = styled.div`
  padding: 5px;
`;

const E = props => { 
  console.log(props.onValueChange);
  console.log(props.handleAction)

  return (
    <AddOrEditExperience>
      <TwoTextFieldsContainer>
        <TextFieldContainer>
          <TextField
            value={props.experience.jobTitle}
            id="jobTitle"
            onChange={props.onValueChange}
            autoFocus
            fullWidth
            label="Job Title"
          />
        </TextFieldContainer>
        <TextFieldContainer>
          <TextField
            value={props.experience.company}
            id="company"
            onChange={props.onValueChange}
            autoFocus
            fullWidth
            label="Company"
          />
        </TextFieldContainer>
      </TwoTextFieldsContainer>
      <TwoTextFieldsContainer>
        <CustomDatePicker
          id="startDate"
          defaultDate={props.experience.startDate}
          onChange={props.onValueChange}
          label="Start Date"
        />
        <CustomDatePicker
          id="endDate"
          defaultDate={props.experience.endDate}
          onChange={props.onValueChange}
          label="End Date"
        />
      </TwoTextFieldsContainer>
      <Button onClick={props.handleAction} variant="raised" color="primary">
        {DoneIcon}
      </Button>
    </AddOrEditExperience>
  );
};

export default E;
