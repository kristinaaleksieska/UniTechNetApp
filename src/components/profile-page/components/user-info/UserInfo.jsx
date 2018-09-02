import React from 'react';
import { firebase } from '../../../../firebase/firebase';
import 'firebase/auth';
import { connect } from 'react-redux';
import { startUpdateGeneralInfo } from '../../../../actions/profile-page/generalInfoActions';
import EditableUserDetails from './EditableUserDetails';
import UserDetails from './UserDetails';
import Loading from '../../../common/Loading';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import DefaultProfilePicture from '../../../../assets/images/default-profile.jpg';

const BackgroundContainer = styled.div`
  background-color: #fff;
`;

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

const UserDetailsContainer = styled.div`
  text-align: center;
`;

const Actions = styled.div`
  margin-top: 10px;
  text-align: center;
`;

class UserInfo extends React.Component {
  state = {
    editable: false,
    isCurrentUser: false,
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

  onValueChange = e => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.id]: e.target.value
      }
    });
  };

  onBirthdayChange = event => {
    const birthday = event.target.value;
    this.setState(() => ({
      user: {
        ...this.state.user,
        birthday
      }
    }));
  };

  editDetails = () => {
    this.setState({
      editable: true
    });
  };

  updateDetails = () => {
    const {
      id,
      name,
      surname,
      gender,
      title,
      username,
      phoneNumber,
      birthday
    } = this.state.user;

    this.props.startUpdateGeneralInfo({
      id: firebase.auth().currentUser.uid,
      name,
      surname,
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

  addConnection = () => {};

  generateActionButton = () => {
    const { isCurrentUser, editable } = this.state;
    const buttonIcon = isCurrentUser ? <EditIcon /> : <AccountCircle />;
    const buttonText = isCurrentUser
      ? editable
        ? 'UPDATE'
        : 'EDIT DETAILS'
      : 'ADD CONNECTION';
    const buttonAction = isCurrentUser
      ? editable
        ? this.updateDetails
        : this.editDetails
      : this.addConnection;

    return (
      <Button onClick={buttonAction} variant="raised" color="primary">
        {buttonIcon}
        {buttonText}
      </Button>
    );
  };

  render() {
    const { user } = this.props;
    const { editable, user: userFromState } = this.state;
    // FIXME: Temporary fix, make progress dialog bigger and global
    if (!user) {
      return <Loading />;
    }

    return (
      <BackgroundContainer>
        <ContentContainer>
          <ProfilePicture src={DefaultProfilePicture} />
          <UserDetailsContainer>
            {editable ? (
              <EditableUserDetails
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

const mapDispatchToProps = dispatch => ({
  startUpdateGeneralInfo: updatedGeneralInfo =>
    dispatch(startUpdateGeneralInfo(updatedGeneralInfo))
});

export default connect(
  null,
  mapDispatchToProps
)(UserInfo);
