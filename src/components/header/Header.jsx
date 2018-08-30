import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import 'firebase/auth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

const StyledTypography = styled(Typography)`
  flex-grow: 1;
`;

const Header = ({ title, onMenuButtonClick }) => {
  const logOut = e => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => console.log('Signed out'))
      .catch(err => console.log(err));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          onClick={onMenuButtonClick(true)}
          aria-label="MenuDrawer"
          color="secondary"
        >
          <MenuIcon />
        </IconButton>
        <StyledTypography variant="title" color="secondary">
          {title}
        </StyledTypography>
        <Button variant="flat" color="secondary" onClick={logOut}>
          LOGOUT
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
