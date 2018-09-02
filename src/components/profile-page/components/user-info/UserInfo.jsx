import React from 'react';
import { firebase } from '../../../../firebase/firebase';
import 'firebase/auth';
import { connect } from 'react-redux';
import { startUpdateGeneralInfo } from '../../../../actions/profile-page/generalInfoActions';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import DefaultProfilePicture from '../../../../assets/images/default-profile.jpg';
import Input from '@material-ui/core/Input';

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

const UserDetails = styled.div`
  text-align: center;
`;

const Actions = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const ProgressContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 900px;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
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

  onInputChange = e => {
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
    const {
      id,
      name,
      surname,
      gender,
      title,
      username,
      phoneNumber
    } = this.state.user;
    this.props.startUpdateGeneralInfo({
      id,
      name,
      surname,
      gender,
      title,
      username,
      phoneNumber
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
      return (
        <ProgressContainer>
          <CircularProgress color="primary" size={200} />
        </ProgressContainer>
      );
    }

    return (
      <BackgroundContainer>
        <ContentContainer>
          <ProfilePicture src={DefaultProfilePicture} />
          <UserDetails>
            {editable ? (
              <div>
                <Input
                  value={userFromState.name}
                  id="name"
                  onChange={this.onInputChange}
                  autoFocus
                  fullWidth
                  placeholder="Name"
                />
                <Input
                  value={userFromState.surname}
                  id="surname"
                  onChange={this.onInputChange}
                  autoFocus
                  fullWidth
                  placeholder="Surname"
                />
                <Input
                  value={userFromState.gender}
                  id="gender"
                  onChange={this.onInputChange}
                  autoFocus
                  fullWidth
                  placeholder="Gender"
                />
                <Input
                  value={userFromState.title}
                  id="title"
                  onChange={this.onInputChange}
                  autoFocus
                  fullWidth
                  placeholder="Title"
                />
                <Input
                  value={userFromState.username}
                  id="username"
                  onChange={this.onInputChange}
                  autoFocus
                  fullWidth
                  placeholder="Username"
                />{' '}
                <Input
                  value={userFromState.phoneNumber}
                  id="phoneNumber"
                  onChange={this.onInputChange}
                  autoFocus
                  fullWidth
                  placeholder="Phone Number"
                />
              </div>
            ) : (
              <div>
                <Typography variant="headline">
                  {`${user.name} ${user.surname}`}
                </Typography>
                <Typography variant="subheading">{user.title}</Typography>
                <Typography variant="caption">
                  {user.phoneNumber} | {user.email}
                </Typography>
              </div>
            )}
          </UserDetails>
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
