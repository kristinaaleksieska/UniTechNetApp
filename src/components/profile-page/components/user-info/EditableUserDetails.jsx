import React from 'react';
import CustomDatePicker from '../../../common/CustomDatePicker';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const options = [
	{
		value: 'male',
		label: 'Male'
	},
	{
		value: 'female',
		label: 'Female'
	}
];
const EditUserContainer = styled.div`
	margin-top: 10px;
	flex-wrap: wrap;
`;

const TwoTextFieldsContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
const SelectContainer = styled.div`
	width: 100%;
	margin-top: 13px;
`;

const StyledSelect = styled(Select)`
	width: 95%;
	padding-left: 4px;
	text-align: left;
`;

const TextFieldContainer = styled.div`padding: 5px;`;

const EditableUserDetails = (props) => (
	<EditUserContainer>
		{console.log(props.user)}
		<TwoTextFieldsContainer>
			<TextFieldContainer>
				<TextField
					value={props.user.firstName}
					id="firstName"
					onChange={props.onValueChange}
					autoFocus
					fullWidth
					label="First name"
				/>
			</TextFieldContainer>
			<TextFieldContainer>
				<TextField
					value={props.user.lastName}
					id="lastName"
					onChange={props.onValueChange}
					fullWidth
					label="Last name"
				/>
			</TextFieldContainer>
		</TwoTextFieldsContainer>
		<TwoTextFieldsContainer>
			<SelectContainer>
				<StyledSelect
					placeholder="Gender"
					value={props.user.gender.value}
					onChange={props.onGenderChange}
					inputProps={{
						name: 'gender',
						id: 'gender',
						width: '100%'
					}}
				>
					<MenuItem value="male">Male</MenuItem>
					<MenuItem value="female">Female</MenuItem>
				</StyledSelect>
			</SelectContainer>
			<TextFieldContainer>
				<TextField value={props.user.title} id="title" onChange={props.onValueChange} fullWidth label="Title" />
			</TextFieldContainer>
		</TwoTextFieldsContainer>

		<TwoTextFieldsContainer>
			<TextFieldContainer>
				<TextField
					value={props.user.username}
					id="username"
					onChange={props.onValueChange}
					fullWidth
					label="Username"
				/>
			</TextFieldContainer>
			<TextFieldContainer>
				<TextField
					value={props.user.phoneNumber}
					id="phoneNumber"
					onChange={props.onValueChange}
					fullWidth
					label="Phone Number"
				/>
			</TextFieldContainer>
		</TwoTextFieldsContainer>
		<CustomDatePicker
			id="birthday"
			defaultDate={props.user.birthday}
			onChange={props.onValueChange}
			label="Birthday"
		/>
	</EditUserContainer>
);

export default EditableUserDetails;
