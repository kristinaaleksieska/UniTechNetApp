import React from 'react';
import database, { firebase } from '../../firebase/firebase';
import { startSetGeneralInfo } from '../../actions/profile-page/generalInfoActions';
import { setInitialUserInfos } from '../../actions/profile-page/loggingInActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import 'firebase/auth';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class LogInPage extends React.Component {
  state = {
    ...INITIAL_STATE
  };

  onUsernameChange = e => {
    const username = e.target.value;
    this.setState(() => ({ username }));
  };

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  onSubmit = e => {
    e.preventDefault();
    let uid = '';
    const { username, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        uid = firebase.auth().currentUser.uid;
        this.setState({ ...INITIAL_STATE });
      })
      .then(() => {
        this.props.setInitialUserInfos(uid).then(() => {
          this.props.startSetGeneralInfo(uid).then(() => {
            const { history } = this.props;
            history.push('/profilepage');
          });
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Username"
            onChange={this.onUsernameChange}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={this.onPasswordChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetGeneralInfo: uid => dispatch(startSetGeneralInfo(uid)),
  setInitialUserInfos: uid => dispatch(setInitialUserInfos(uid))
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(LogInPage));
