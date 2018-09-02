import React from 'react';
import CustomDatePicker from '../../../common/CustomDatePicker';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const EditableUserDetails = props => (
  <div>
    <TextField
      value={props.user.name}
      id="name"
      onChange={props.onValueChange}
      autoFocus
      fullWidth
      label="Name"
    />
    <TextField
      value={props.user.surname}
      id="surname"
      onChange={props.onValueChange}
      autoFocus
      fullWidth
      label="Surname"
    />
    <TextField
      value={props.user.gender}
      id="gender"
      onChange={props.onValueChange}
      autoFocus
      fullWidth
      label="Gender"
    />
    <TextField
      value={props.user.title}
      id="title"
      onChange={props.onValueChange}
      autoFocus
      fullWidth
      label="Title"
    />
    <TextField
      value={props.user.username}
      id="username"
      onChange={props.onValueChange}
      autoFocus
      fullWidth
      label="Username"
    />
    <TextField
      value={props.user.phoneNumber}
      id="phoneNumber"
      onChange={props.onValueChange}
      autoFocus
      fullWidth
      label="Phone Number"
    />
    <CustomDatePicker
      id="birthday"
      defaultDate={props.user.birthday}
      onChange={props.onValueChange}
    />
  </div>
);

export default EditableUserDetails;
