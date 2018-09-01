import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Input from '@material-ui/core/Input';

// Actions
import { loginWithEmailAndPassword } from '../../../../actions/login/loginActions';

class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  onInputChange = e => {
    this.setState(
      {
        [e.target.id]: e.target.value
      },
      () => console.log(this.state)
    );
  };

  onButtonClick = () => {
    const { username, password } = this.state;
    this.props.loginWithEmailAndPassword(username, password);
  };

  render() {
    const { username, password } = this.state;

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
