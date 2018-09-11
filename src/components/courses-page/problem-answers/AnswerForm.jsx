import React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Done from '@material-ui/icons/Done';
import { connect } from 'react-redux';
import moment from 'moment';

const DoneIcon = <Done />;

const AnswerFormContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 10px;
	flex-direction: column;
`;

class AnswerForm extends React.Component {
	constructor(props) {
		super(props);
		const { userLoggedIn, answer, authorDetails } = props;

		if (!answer) {
			this.state = {
				description: '',
				author: { [userLoggedIn.id]: { firstName: userLoggedIn.firstName, lastName: userLoggedIn.lastName } },
				date: moment.utc().format()
			};
		} else {
			this.state = {
				description: answer.description,
				date: answer.date,
				author: {
					[answer.author]: {
						firstName: authorDetails.firstName,
						lastName: authorDetails.lastName
					}
				},
				id: answer.id
			};
		}
	}

	onValueChange = (e) => {
		this.setState({
			...this.state.experience,
			[e.target.id]: e.target.value
		});
	};

	handleAction = () => {
		const answer = { ...this.state };
		this.props.handleAction(answer);
	};

	render() {
		return (
			<AnswerFormContainer>
				<TextField
					value={this.state.description}
					onChange={this.onValueChange}
					id="description"
					autoFocus
					fullWidth
					required
					multiline
					rows={5}
					label="Answer"
				/>
				<Button onClick={this.handleAction} variant="flat" color="primary">
					Save {DoneIcon}
				</Button>
			</AnswerFormContainer>
		);
	}
}

export default AnswerForm;
