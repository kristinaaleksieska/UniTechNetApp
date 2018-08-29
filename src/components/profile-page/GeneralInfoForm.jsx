import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import CustomDatePicker from '../common/CustomDatePicker';

export class GeneralInfoForm extends React.Component {
  state = {
    id: '',
    birthday: moment(),
    name: '',
    surname: '',
    gender: ''
  };

  componentWillReceiveProps(nextProps) {
    const { generalInfo } = nextProps;

    if (generalInfo) {
      this.setState({
        ...generalInfo
      });
      if (generalInfo.birthday) {
        let birthday = moment(generalInfo.birthday);
        this.setState({ birthday });
      }
    }
  }

  onNameChange = e => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onSurnameChange = e => {
    const surname = e.target.value;
    this.setState(() => ({ surname }));
  };

  onGenderChange = e => {
    const gender = e.target.value;
    this.setState(() => ({ gender }));
  };

  onBirthdayChange = event => {
    let birthday = moment(event.target.value);
    this.setState(() => ({ birthday }));
  };

  onSubmit = e => {
    e.preventDefault();
    if (
      !this.state.birthday ||
      !this.state.name ||
      !this.state.surname ||
      !this.state.gender
    ) {
      this.setState({ error: 'Please provide all of the information' });
    } else {
      const birthday = this.state.birthday.toString();
      this.setState({ error: '' });
      console.log(birthday);
      this.props.onSubmit({
        id: this.state.id,
        name: this.state.name,
        surname: this.state.surname,
        gender: this.state.gender,
        birthday
      });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <CustomDatePicker
            defaultDate={this.state.birthday.format('YYYY-MM-DD')}
            onChange={this.onBirthdayChange}
          />
          <input
            type="text"
            placeholder="Enter your surname"
            value={this.state.surname}
            onChange={this.onSurnameChange}
          />
          <input
            type="text"
            placeholder="Gender"
            value={this.state.gender}
            onChange={this.onGenderChange}
          />
          <button>Update general information</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  generalInfo: state.generalInfo,
  users: state.firebase.data.users,
  courses: state.firebase.data.courses
});

export default compose(
  firebaseConnect(['users', 'courses']),
  connect(mapStateToProps)
)(GeneralInfoForm);
