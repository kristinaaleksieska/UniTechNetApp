import React from 'react';
import { firebase } from '../../../../firebase/firebase';
import 'firebase/auth';
import { connect } from 'react-redux';
import { startUpdateGeneralInfo } from '../../../../actions/profile-page/generalInfoActions';
import { addConnection } from '../../../../actions/profile-page/connectionActions';
import { uploadPhotoOnFirebase } from '../../../../actions/profile-page/profilePicture';
import { userLoggedIn } from '../../../../selectors/firebaseSelectors';
import EditableUserDetails from './EditableUserDetails';
import UserDetails from './UserDetails';
import Loading from '../../../common/Loading';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import DefaultProfilePicture from '../../../../assets/images/default-profile.jpg';

const BackgroundContainer = styled.div`background-color: #fff;`;

const ContentContainer = styled.div`
	width: 50%;
	margin: 20px auto 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const ProfilePicture = styled.img`
	border-radius: 50%;
	width: 20%;
`;

const UserDetailsContainer = styled.div`text-align: center;`;

const Actions = styled.div`
	margin-top: 10px;
	text-align: center;
`;

class UserInfo extends React.Component {
	state = {
		editable: false,
		isConnected: false,
		isCurrentUser: false,
		photoUrl: '',
		user: {}
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (!nextProps.user) {
			return prevState;
		}
		let newState = {
			...prevState,
			isCurrentUser: firebase.auth().currentUser.uid === nextProps.user.id
		};

		if (Object.keys(newState.user).length === 0) {
			newState = { ...newState, user: nextProps.user };
		}

		return newState;
	}

	onValueChange = (e) => {
		this.setState({
			user: {
				...this.state.user,
				[e.target.id]: e.target.value
			}
		});
	};

	editDetails = () => {
		this.setState({
			editable: true
		});
	};

	updateDetails = () => {
		const { id, firstName, lastName, gender, title, username, phoneNumber, birthday } = this.state.user;

		this.props.startUpdateGeneralInfo({
			id: firebase.auth().currentUser.uid,
			firstName,
			lastName,
			gender,
			title,
			username,
			phoneNumber,
			birthday
		});

		this.setState({
			editable: false
		});
	};

	addConnection = () => {
		this.props.addConnection(this.props.userLoggedIn, this.state.user.id);
	};

	sendMessage = () => {};

	generateActionButton = () => {
		const { isCurrentUser, editable } = this.state;
		const { isConnected } = this.props;
		const buttonIcon = isCurrentUser ? <EditIcon /> : <AccountCircle />;
		const buttonText = isCurrentUser ? (editable ? 'UPDATE' : 'EDIT DETAILS') : 'SEND MESSAGE';
		const buttonAction = isCurrentUser ? (editable ? this.updateDetails : this.editDetails) : this.sendMessage;

		if (!isCurrentUser && !isConnected) {
			return null;
		}

		return (
			<Button onClick={buttonAction} variant="raised" color="primary">
				{buttonIcon}
				{buttonText}
			</Button>
		);
	};

	changePhoto = (event) => {
		this.setState({
			photoUrl: event.target.files[0]
		});
	};

	onPhotoUpload = () => {
		const { id } = this.props.user;
		const { photoUrl } = this.state;
		this.props.uploadPhotoOnFirebase(id, photoUrl);
	};

	render() {
		const { user } = this.props;
		const { editable, user: userFromState } = this.state;

		if (!user) {
			return <Loading />;
		}

		return (
			<BackgroundContainer>
				<ContentContainer>
					<ProfilePicture src={user.profilePictureUrl} />
					<input type="file" onChange={this.changePhoto} />
					<Button onClick={this.onPhotoUpload}>Do it</Button>
					<UserDetailsContainer>
						{editable ? (
							<EditableUserDetails onValueChange={this.onValueChange} user={userFromState} />
						) : (
							<UserDetails user={userFromState} />
						)}
					</UserDetailsContainer>
					<Actions>{this.generateActionButton()}</Actions>
				</ContentContainer>
			</BackgroundContainer>
		);
	}
}

const mapDispatchToProps = {
	startUpdateGeneralInfo,
	addConnection,
	uploadPhotoOnFirebase
};

const mapStateToProps = (state) => ({
	userLoggedIn: userLoggedIn(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
