import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import { firebase } from '../../../../firebase/firebase';
import 'firebase/auth';
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
`

class UserInfo extends React.Component {
  state = {
    editable: false,
    isCurrentUser: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.user) {
      return prevState;
    }
    return {
      ...prevState,
      isCurrentUser: firebase.auth().currentUser.uid === nextProps.user.id,
    };
  }

  editDetails = () => {
    this.setState({
      editable: true,
    });
  }

  addConnection = () => {

  }

  generateActionButton = () => {
    const { isCurrentUser } = this.state;
    const buttonIcon = isCurrentUser ? <EditIcon /> : <AccountCircle />;
    const buttonText = isCurrentUser ? 'EDIT DETAILS' : 'ADD CONNECTION';
    const buttonAction = isCurrentUser ? this.editDetails : this.addConnection;

    return (
      <Button onClick={buttonAction} variant="raised" color="primary">
        {buttonIcon}
        {buttonText}
      </Button>
    );
  }

  render() {
    const { user } = this.props;

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
            <Typography variant="headline">
              {`${user.name} ${user.surname}`}
            </Typography>
            <Typography variant="subheading">
              {user.title}
            </Typography>
            <Typography variant="caption">
              {user.phoneNumber} | {user.email}
            </Typography>
          </UserDetails>
          <Actions>
            {this.generateActionButton()}
          </Actions>
        </ContentContainer>
      </BackgroundContainer>
    );
  }
}

export default UserInfo;