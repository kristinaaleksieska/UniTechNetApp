import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}
const styles = (theme) => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 90,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4
	}
});

const SimpleModal = (props) => {
	const { users } = props;
	return (
		<div>
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={props.shouldBeOpen}
				onClose={props.handleClose}
			>
				<div style={getModalStyle()} className={props.classes.paper}>
					<Typography variant="title" id="modal-title">
						<b>Course subscribers:</b>
					</Typography>
					<Typography variant="subheading" id="simple-modal-description">
						{users.map((user) => {
							let title = `${user.firstName} ${user.lastName}`;

							if (props.currentUserId === user.id) {
								title = `${title} (me)`;
							}

							const avatar = user.profilePictureUrl ? (
								<Avatar
									aria-label="Profile Picture"
									src={user.profilePictureUrl}
									alt={user.firstName[0]}
								/>
							) : (
								<Avatar aria-label="Profile Picture">{user.firstName[0]}</Avatar>
							);

							return (
								<Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
									<CardHeader key={user.id} title={title} avatar={avatar} />
								</Link>
							);
						})}
					</Typography>
				</div>
			</Modal>
		</div>
	);
};

export default withStyles(styles)(SimpleModal);
