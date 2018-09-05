import React from 'react';
import CustomDatePicker from '../../../common/CustomDatePicker';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Done from '@material-ui/icons/Done';

const EditUserContainer = styled.div`
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

const EditableUserDetails = props => (
  <EditUserContainer>
    <TwoTextFieldsContainer>
      <TextFieldContainer>
        <TextField
          value={props.user.name}
          id="name"
          onChange={props.onValueChange}
          autoFocus
          fullWidth
          label="Name"
        />
      </TextFieldContainer>
      <TextFieldContainer>
        <TextField
          value={props.user.surname}
          id="surname"
          onChange={props.onValueChange}
          autoFocus
          fullWidth
          label="Surname"
        />
      </TextFieldContainer>
    </TwoTextFieldsContainer>
    <TwoTextFieldsContainer>
      <TextFieldContainer>
        <TextField
          value={props.user.gender}
          id="gender"
          onChange={props.onValueChange}
          autoFocus
          fullWidth
          label="Gender"
        />
      </TextFieldContainer>
      <TextFieldContainer>
        <TextField
          value={props.user.title}
          id="title"
          onChange={props.onValueChange}
          autoFocus
          fullWidth
          label="Title"
        />
      </TextFieldContainer>
    </TwoTextFieldsContainer>

    <TwoTextFieldsContainer>
      <TextFieldContainer>
        <TextField
          value={props.user.username}
          id="username"
          onChange={props.onValueChange}
          autoFocus
          fullWidth
          label="Username"
        />
      </TextFieldContainer>
      <TextFieldContainer>
        <TextField
          value={props.user.phoneNumber}
          id="phoneNumber"
          onChange={props.onValueChange}
          autoFocus
          fullWidth
          label="Phone Number"
        />
      </TextFieldContainer>
    </TwoTextFieldsContainer>
    <CustomDatePicker
      id="birthday"
      defaultDate={props.user.birthday}
      onChange={props.onValueChange}
    />
  </EditUserContainer>
);

export default EditableUserDetails;
