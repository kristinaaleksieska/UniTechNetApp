import React from 'react';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/auth/dist/index.cjs';

class Header extends React.Component {
  logOut = e => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => console.log('Signed out'))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <header>
        <h1>UniTechNet</h1>
        <NavLink to="/profilepage">ProfilePage</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <button onClick={this.logOut}>Logout</button>
      </header>
    );
  }
}

export default Header;
