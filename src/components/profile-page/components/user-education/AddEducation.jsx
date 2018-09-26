import React from 'react';
import { connect } from 'react-redux';
import EducationForm from './EducationForm';
import Button from '@material-ui/core/Button';
import { userLoggedIn } from '../../../../selectors/firebaseSelectors';
import { addEducation } from '../../../../actions/user/educationActions';
import CardActions from '@material-ui/core/CardActions';
import styled from 'styled-components';

const EducationContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 8px 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.38);
	padding-right: 15px;
`;

const ColumnContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

class AddEducation extends React.Component {
	state = {
		addable: false,
		error: ''
	};

	addEducation = (education) => {
		if (!education.startDate || !education.grade || !education.school || !education.degree) {
			this.setState({
				error: 'GPA, School, Degree and StartDate can not be empty'
			});
		} else {
			this.props.addEducation(this.props.uid, education);
			this.setState({ addable: false });
		}
	};

	render() {
		const { addable, error } = this.state;
		return (
			<EducationContainer>
				{addable ? (
					<ColumnContainer>
						<EducationForm handleAction={this.addEducation} />
						{error && <h5>{error}</h5>}
					</ColumnContainer>
				) : (
					<CardActions>
						<Button color="primary" variant="flat" onClick={() => this.setState({ addable: true })}>
							ADD EDUCATION
						</Button>
					</CardActions>
				)}
			</EducationContainer>
		);
	}
}

const mapStateToProps = (state) => ({
	uid: userLoggedIn(state)
});

const mapDispatchToProps = {
	addEducation
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEducation);
