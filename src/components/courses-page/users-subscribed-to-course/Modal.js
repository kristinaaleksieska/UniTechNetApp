import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Loading from '../../common/Loading';

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

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
						{Array.isArray(props.users) ? (
							props.users.map((user) => <div>{user}</div>)
						) : (
							<div>{props.users}</div>
						)}
					</Typography>
				</div>
			</Modal>
		</div>
	);
};

export default withStyles(styles)(SimpleModal);
