import React from 'react';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import Loading from '../../../common/Loading';
import EducationForm from './EducationForm';
import { updateEducation, removeEducation } from '../../../../actions/user/educationActions';
import { userLoggedIn } from '../../../../selectors/firebaseSelectors';
import { connect } from 'react-redux';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const present = 'PRESENT';

const EditIcon = <Edit />;

const DeleteIcon = <Delete />;

const EducationContainer = styled.div`
	display: flex;
	padding: 8px 0;
	justify-content: ${ifProp('editable', 'center', 'flex-start')};
	border-bottom: 1px solid rgba(0, 0, 0, 0.38);
`;

const EducationWrapper = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
`;

const InfoContainer = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-around;
`;

class UserEducation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editable: false
		};
	}

	EditEducation = (education) => {
		const { uid } = this.props;
		this.props.updateEducation(uid, education);

		this.setState({ editable: false });
	};

	render() {
		const { editable } = this.state;
		const { uid, education } = this.props;

		if (!education) return <Loading />;

		return (
			<EducationContainer editable={editable}>
				{editable ? (
					<EducationForm education={education} handleAction={this.EditEducation} />
				) : (
					<EducationWrapper>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%'
							}}
						>
							<Typography variant="title">{education.degree}</Typography>
							<InfoContainer>
								<Typography variant="subheading">{education.school}</Typography>
								<Typography variant="caption">
									{education.startDate} - {education.endDate ? education.endDate : present}
								</Typography>
							</InfoContainer>
						</div>
						<ButtonContainer>
							<Button onClick={() => this.setState({ editable: true })} variant="flat">
								{EditIcon}
							</Button>
							<Button
								onClick={() => this.props.removeEducation(uid, education.id)}
								variant="flat"
								color="primary"
							>
								{DeleteIcon}
							</Button>
						</ButtonContainer>
					</EducationWrapper>
				)}
			</EducationContainer>
		);
	}
}

const mapDispatchToProps = {
	updateEducation,
	removeEducation
};

const mapStateToProps = (state) => ({
	uid: userLoggedIn(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEducation);
