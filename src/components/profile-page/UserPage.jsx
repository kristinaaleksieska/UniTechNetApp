import React from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { firebase } from '../../firebase/firebase';

import UserInfo from './components/user-info/UserInfo';
import ListUserCourses from './components/user-courses/ListUserCourses';
import ListUserExperiences from './components/user-experiences/ListUserExperiences';
// Selectors
import { getUserDetailsById, areUsersConnected } from '../../selectors/firebaseSelectors';

const TwoCardsContainer = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	flex-flow: wrap;
`;

const CardContainer = styled.div`width: 48%;`;

class UserPage extends React.Component {
	render() {
		return (
			<div>
				<UserInfo user={this.props.user} isConnected={this.props.isConnected} />
				<TwoCardsContainer>
					<CardContainer>
						<ListUserCourses user={this.props.user} />
					</CardContainer>
					<CardContainer>
						<ListUserExperiences user={this.props.user} />
					</CardContainer>
				</TwoCardsContainer>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	user: getUserDetailsById(ownProps.match.params.userId)(state),
	isConnected: areUsersConnected(ownProps.match.params.userId, firebase.auth().currentUser.uid)(state)
});

const composer = compose(firebaseConnect([ 'users' ]), connect(mapStateToProps));

export default composer(UserPage);
