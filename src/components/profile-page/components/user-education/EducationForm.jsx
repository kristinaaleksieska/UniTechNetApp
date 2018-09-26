import React from 'react';
import CustomDatePicker from '../../../common/CustomDatePicker';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Done from '@material-ui/icons/Done';

const DoneIcon = <Done />;

const AddOrEditEducation = styled.div`
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

class EducationForm extends React.Component {
	constructor(props) {
		super(props);
		if (props.education) {
			this.state = {
				id: props.education.id,
				startDate: props.education.startDate,
				endDate: props.education.endDate ? props.education.endDate : '',
				grade: props.education.grade,
				school: props.education.school,
				degree: props.education.degree
			};
		} else {
			this.state = {
				startDate: '',
				endDate: '',
				grade: '',
				school: '',
				degree: ''
			};
		}
	}

	onValueChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	};

	handleAction = () => {
		const education = { ...this.state };
		this.props.handleAction(education);
	};

	render() {
		return (
			<AddOrEditEducation>
				<TwoTextFieldsContainer>
					<TextFieldContainer>
						<TextField
							value={this.state.degree}
							id="degree"
							onChange={this.onValueChange}
							autoFocus
							fullWidth
							required
							label="Degree"
						/>
					</TextFieldContainer>
					<TextFieldContainer>
						<TextField
							value={this.state.grade}
							id="grade"
							onChange={this.onValueChange}
							fullWidth
							label="GPA"
						/>
					</TextFieldContainer>
				</TwoTextFieldsContainer>
				<TwoTextFieldsContainer>
					<TextField
						value={this.state.school}
						id="school"
						onChange={this.onValueChange}
						fullWidth
						label="School"
					/>
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
			</AddOrEditEducation>
		);
	}
}

export default EducationForm;
