import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Input from '@material-ui/core/Input';
import moment from 'moment';

// Actions
import { loginWithEmailAndPassword } from '../../../../actions/login/loginActions';

class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    error: ''
  };

  onInputChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onButtonClick = () => {
    const { username, password } = this.state;
    this.props.loginWithEmailAndPassword(username, password).catch(error => {
      this.setState({
        error: 'You have entered an invalid email or password'
      });
      console.log(
        moment
          .utc()
          .add(2, 'hours')
          .format()
      );
    });
  };

  render() {
    const { username, password, error } = this.state;

    return (
      <Card>
        <CardContent>
          <Input
            value={username}
            id="username"
            onChange={this.onInputChange}
            autoFocus
            fullWidth
            placeholder="Username"
          />
          <Input
            value={password}
            id="password"
            onChange={this.onInputChange}
            fullWidth
            placeholder="Password"
            type="password"
          />
        </CardContent>
        <CardActions>
          <Button onClick={this.onButtonClick} color="primary" variant="flat">
            Log in
          </Button>
          {error && <h5>{error}</h5>}
        </CardActions>
      </Card>
    );
  }
}

const mapDispatchToProps = {
  loginWithEmailAndPassword
};

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
