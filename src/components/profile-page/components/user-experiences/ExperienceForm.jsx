import React from 'react';
import CustomDatePicker from '../../../common/CustomDatePicker';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Done from '@material-ui/icons/Done';

const DoneIcon = <Done />;

const AddOrEditExperience = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 10px;
	flex-direction: column;
`;

const TwoTextFieldsContainer = styled.div`
	display: flex;
	margin-bottom: 8px;
	justify-content: space-between;
`;

const TextFieldContainer = styled.div`padding: 5px;`;

class ExperienceForm extends React.Component {
	constructor(props) {
		super(props);
		if (props.experience) {
			this.state = {
				id: props.experience.id,
				startDate: props.experience.startDate,
				endDate: props.experience.endDate ? props.experience.endDate : '',
				company: props.experience.company,
				jobTitle: props.experience.jobTitle
			};
		} else {
			this.state = {
				startDate: '',
				endDate: '',
				company: '',
				jobTitle: ''
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
		const experience = { ...this.state };
		this.props.handleAction(experience);
	};

	render() {
		return (
			<AddOrEditExperience>
				<TwoTextFieldsContainer>
					<TextFieldContainer>
						<TextField
							value={this.state.jobTitle}
							id="jobTitle"
							onChange={this.onValueChange}
							autoFocus
							fullWidth
							required
							label="Job Title"
						/>
					</TextFieldContainer>
					<TextFieldContainer>
						<TextField
							value={this.state.company}
							id="company"
							onChange={this.onValueChange}
							fullWidth
							label="Company"
						/>
					</TextFieldContainer>
				</TwoTextFieldsContainer>
				<TwoTextFieldsContainer>
					<CustomDatePicker
						id="startDate"
						defaultDate={this.state.startDate}
						onChange={this.onValueChange}
						label="Start Date"
					/>
					<CustomDatePicker
						id="endDate"
						defaultDate={this.state.endDate}
						onChange={this.onValueChange}
						label="End Date"
					/>
				</TwoTextFieldsContainer>
				<Button onClick={this.handleAction} variant="flat" color="primary">
					{DoneIcon}
				</Button>
			</AddOrEditExperience>
		);
	}
}

export default ExperienceForm;
