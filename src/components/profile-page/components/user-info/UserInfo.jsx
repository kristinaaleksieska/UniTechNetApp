import React from 'react';
import _startCase from 'lodash/startCase';
import { firebase } from '../../../../firebase/firebase';
import 'firebase/auth';
import { connect } from 'react-redux';
import { startUpdateGeneralInfo } from '../../../../actions/user/generalInfoActions';
import { addConnection } from '../../../../actions/user/connectionActions';
import { uploadPhotoOnFirebase } from '../../../../actions/user/profilePicture';
import { userLoggedIn } from '../../../../selectors/firebaseSelectors';
import { withRouter } from 'react-router';
import EditableUserDetails from './EditableUserDetails';
import UserDetails from './UserDetails';
import Loading from '../../../common/Loading';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';
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

const HiddenContent = styled.div`display: none;`;

const ProfilePicture = styled.img`
	border-radius: 50%;
	width: 20%;

	cursor: pointer;

	opacity: ${ifProp('isPhotoUploading', '0.5', '1')};

	&:hover {
		opacity: 0.5;
	}
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

	constructor(props) {
		super(props);

		this.profileInputRef = React.createRef();
	}

	onProfilePictureClick = () => {
		this.profileInputRef.current.click();
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

	onGenderChange = (event) => {
		this.setState({
			user: {
				...this.state.user,
				gender: {
					value: event.target.value,
					label: _startCase(event.target.value.toLowerCase())
				}
			}
		});
	};

	editDetails = () => {
		this.setState({
			editable: true,
			isPhotoUploading: false
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

	sendMessage = () => {
		const { history } = this.props;
		const { id } = this.state.user;
		history.push(`/messenger/${id}`);
	};

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
		const { id } = this.props.user;
		const [ photo ] = event.target.files;
		if (photo) {
			this.setState(
				{
					isPhotoUploading: true
				},
				() => {
					this.props.uploadPhotoOnFirebase(id, photo).then(() => {
						this.setState({
							isPhotoUploading: false
						});
					});
				}
			);
		}
	};

	render() {
		const { user } = this.props;
		const { editable, user: userFromState, isPhotoUploading } = this.state;

		if (!user) {
			return <Loading />;
		}

		return (
			<BackgroundContainer>
				<ContentContainer>
					<ProfilePicture
						isPhotoUploading={isPhotoUploading}
						onClick={this.onProfilePictureClick}
						src={user.profilePictureUrl}
					/>
					<HiddenContent>
						<input ref={this.profileInputRef} type="file" onChange={this.changePhoto} />
					</HiddenContent>
					<UserDetailsContainer>
						{editable ? (
							<EditableUserDetails
								onGenderChange={this.onGenderChange}
								onValueChange={this.onValueChange}
								user={userFromState}
							/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfo));
