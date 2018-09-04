import React from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { startUpdateGeneralInfo } from '../../actions/profile-page/generalInfoActions';
import styled from 'styled-components';

import UserInfo from './components/user-info/UserInfo';
import UserCourses from './components/user-courses/UserCourses';
import ListUserExperiences from './components/user-experiences/ListUserExperiences';
// Selectors
import { getCurrentUserDetails } from '../../selectors/firebaseSelectors';

const TwoCardsContainer = styled.div`
  display: flex,
  align-content: stretch;
  align-items: center;
  flex-flow: wrap;
  height: 500px;
`;

const CardContainer = styled.div`
  padding: 5px;
  float: left;
  width: 40%;
`;

class ProfilePage extends React.Component {
  onSubmit = updatedGeneralInfo => {
    this.props.startUpdateGeneralInfo(updatedGeneralInfo);
  };

  render() {
    return (
      <div>
        <UserInfo user={this.props.currentUser} />
        <TwoCardsContainer>
          <CardContainer>
            <UserCourses user={this.props.currentUser} />
          </CardContainer>
          <CardContainer>
            <ListUserExperiences user={this.props.currentUser} />
          </CardContainer>
        </TwoCardsContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: getCurrentUserDetails(state)
});

const mapDispatchToProps = dispatch => ({
  startUpdateGeneralInfo: updatedGeneralInfo =>
    dispatch(startUpdateGeneralInfo(updatedGeneralInfo))
});

const composer = compose(
  firebaseConnect(['users']),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default composer(ProfilePage);
