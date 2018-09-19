import React from 'react';
import { connect } from 'react-redux';
import ExperienceForm from './ExperienceForm';
import Button from '@material-ui/core/Button';
import { userLoggedIn } from '../../../../selectors/firebaseSelectors';
import { addExperience } from '../../../../actions/user/experienceActions';
import CardActions from '@material-ui/core/CardActions';
import styled from 'styled-components';

const ExperienceContainer = styled.div`
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

class AddExperience extends React.Component {
	state = {
		addable: false,
		error: ''
	};

	addExperience = (experience) => {
		if (!experience.startDate || !experience.company || !experience.jobTitle) {
			this.setState({
				error: 'Company name, Job Title and Start Date must not be empty'
			});
		} else {
			this.props.addExperience(this.props.uid, experience);
			this.setState({ addable: false });
		}
	};

	render() {
		const { addable, error } = this.state;
		return (
			<ExperienceContainer>
				{addable ? (
					<ColumnContainer>
						<ExperienceForm handleAction={this.addExperience} />
						{error && <h5>{error}</h5>}
					</ColumnContainer>
				) : (
					<CardActions>
						<Button color="primary" variant="flat" onClick={() => this.setState({ addable: true })}>
							ADD EXPERIENCE
						</Button>
					</CardActions>
				)}
			</ExperienceContainer>
		);
	}
}

const mapStateToProps = (state) => ({
	uid: userLoggedIn(state)
});

const mapDispatchToProps = {
	addExperience
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExperience);
