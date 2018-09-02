import React from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { startUpdateGeneralInfo } from '../../actions/profile-page/generalInfoActions';

import UserInfo from './components/user-info/UserInfo';
import UserCourses from './components/user-courses/UserCourses';
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
        <UserCourses user={this.props.currentUser} />
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
