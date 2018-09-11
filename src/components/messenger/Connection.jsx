import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

const Connection = ({ connection, onClick, className }) => {
	if (!connection) {
		return null;
	}

	const onConnectionClicked = () => {
		onClick(connection.id);
	};

	const avatar = connection.profilePictureUrl ? (
		<Avatar aria-label="Profile Picture" src={connection.profilePictureUrl} alt={connection.firstName[0]} />
	) : (
		<Avatar aria-label="Profile Picture">{connection.firstName[0]}</Avatar>
	);

	return (
		<Card className={className} onClick={onConnectionClicked}>
			<CardHeader avatar={avatar} title={`${connection.firstName} ${connection.lastName}`} />
		</Card>
	);
};

export default Connection;
