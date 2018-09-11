import React from 'react';
import Typography from '@material-ui/core/Typography';

const UserDetails = (props) => (
	<div>
		<Typography variant="headline">{`${props.user.firstName} ${props.user.lastName}`}</Typography>
		<Typography variant="subheading">{props.user.title}</Typography>
		<Typography variant="caption">
			{props.user.phoneNumber} | {props.user.email}
		</Typography>
	</div>
);

export default UserDetails;
