import React from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { startUpdateGeneralInfo } from '../../actions/user/generalInfoActions';
import styled from 'styled-components';

import UserInfo from './components/user-info/UserInfo';
import ListUserCourses from './components/user-courses/ListUserCourses';
import ListUserExperiences from './components/user-experiences/ListUserExperiences';
import ListUserEducation from './components/user-education/ListUserEducation';
// Selectors
import { getCurrentUserDetails } from '../../selectors/firebaseSelectors';

const TwoCardsContainer = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	flex-flow: wrap;
`;

const ColumnCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 48%;
`;

class ProfilePage extends React.Component {
	onSubmit = (updatedGeneralInfo) => {
		this.props.startUpdateGeneralInfo(updatedGeneralInfo);
	};

	render() {
		return (
			<div>
				<UserInfo user={this.props.currentUser} />
				<TwoCardsContainer>
					<ColumnCardContainer>
						<ListUserCourses user={this.props.currentUser} />
					</ColumnCardContainer>
					<ColumnCardContainer>
						<ListUserExperiences user={this.props.currentUser} />
						<ListUserEducation user={this.props.currentUser} />
					</ColumnCardContainer>
				</TwoCardsContainer>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	currentUser: getCurrentUserDetails(state)
});

const mapDispatchToProps = (dispatch) => ({
	startUpdateGeneralInfo: (updatedGeneralInfo) => dispatch(startUpdateGeneralInfo(updatedGeneralInfo))
});

const composer = compose(firebaseConnect([ 'users' ]), connect(mapStateToProps, mapDispatchToProps));

export default composer(ProfilePage);
