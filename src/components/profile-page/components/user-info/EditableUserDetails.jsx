import React from 'react';
import CustomDatePicker from '../../../common/CustomDatePicker';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const EditUserContainer = styled.div`
	margin-top: 10px;
	flex-wrap: wrap;
`;

const TwoTextFieldsContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const TextFieldContainer = styled.div`padding: 5px;`;

const EditableUserDetails = (props) => (
	<EditUserContainer>
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
					autoFocus
					fullWidth
					label="Last name"
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
			label="Birthday"
		/>
	</EditUserContainer>
);

export default EditableUserDetails;
