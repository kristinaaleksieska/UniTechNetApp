import React from 'react';
import { compose } from 'redux';
import styled from 'styled-components';
import { firebaseConnect, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { startUpdateGeneralInfo } from '../../actions/profile-page/generalInfoActions';
import GeneralInfoForm from './GeneralInfoForm';

import UserInfo from './components/user-info/UserInfo';

// Selectors
import { getCurrentUserDetails } from '../../selectors/firebaseSelectors';

class ProfilePage extends React.Component {
  onSubmit = updatedGeneralInfo => {
    this.props.startUpdateGeneralInfo(updatedGeneralInfo);
  };

  render() {
    return (
      <div>
        <UserInfo user={this.props.currentUser} />
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
