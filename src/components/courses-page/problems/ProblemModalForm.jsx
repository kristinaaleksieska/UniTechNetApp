import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { addProblem, editProblem } from '../../../actions/problems/problems';
import { getUserDetailsById } from '../../../selectors/firebaseSelectors';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const TextFieldContainer = styled.div`padding: 5px;`;

const AddOrEditProblemContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 10px;
	flex-direction: column;
`;

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

class SimpleModal extends React.Component {
	constructor(props) {
		super(props);
		const { userDetails } = props;

		this.state = {
			date: moment.utc().format(),
			description: '',
			name: '',
			answerId: false,
			author: {
				[userDetails.id]: {
					firstName: userDetails.firstName,
					lastName: userDetails.lastName
				}
			}
		};
	}

	componentWillReceiveProps(nextProps) {
		if (!this.state.id && nextProps.problem && nextProps.problem.id) {
			this.setState({ ...nextProps.problem });
		}
	}

	onValueChange = (e) => {
		this.setState({
			...this.state.experience,
			[e.target.id]: e.target.value
		});
	};

	handleAction = () => {
		const handleAction = this.props.editMode ? this.props.editProblem : this.props.addProblem;
		const problem = { ...this.state };
		handleAction(this.props.courseId, problem);
		if (!this.props.editMode) {
			this.onModalClose();
		}

		this.props.handleClose();
	};

	onModalClose = () => {
		this.setState({
			description: '',
			name: '',
			date: moment.utc().format(),
			answerId: false
		});
	};

	render() {
		const { title, shouldBeOpen } = this.props;
		return (
			<div>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={shouldBeOpen}
					onClose={this.onModalClose}
				>
					<div style={getModalStyle()} className={this.props.classes.paper}>
						<Typography variant="title" id="modal-title">
							<b>{title}</b>
						</Typography>
						<AddOrEditProblemContainer>
							<TextFieldContainer>
								<TextField
									value={this.state.name}
									id="name"
									onChange={this.onValueChange}
									autoFocus
									label="Title"
								/>
							</TextFieldContainer>
							<TextFieldContainer>
								<TextField
									value={this.state.description}
									id="description"
									onChange={this.onValueChange}
									fullWidth
									multiline
									rows={6}
									label="Content"
								/>
							</TextFieldContainer>
						</AddOrEditProblemContainer>
						<Button
							style={{ marginTop: '10px' }}
							onClick={this.handleAction}
							variant="flat"
							color="primary"
						>
							Save
						</Button>
					</div>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	userDetails: getUserDetailsById(ownProps.userId)(state)
});

const mapDispatchToProps = { addProblem, editProblem };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SimpleModal));
