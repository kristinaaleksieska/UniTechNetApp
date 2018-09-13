import React from 'react';
import styled from 'styled-components';
import _find from 'lodash/find';
import { withRouter } from 'react-router';
import 'firebase/auth';
import { logout } from '../../actions/logout/logoutActions';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

const StyledTypography = styled(Typography)`
  flex-grow: 1;
`;

const Titles = {
	'/profilepage': 'Profile',
	'/courses/': 'Course',
	'/courses': 'Courses',
	'/feed': 'Feed',
	'/messenger': 'Messenger'
};

const getTitleFromPathname = (pathname) => {
	const titleKey = _find(Object.keys(Titles), (titleKey) => pathname.includes(titleKey));

	return titleKey ? Titles[titleKey] : 'Title';
};

const Header = ({ onMenuButtonClick, logout, location }) => {
	const title = getTitleFromPathname(location.pathname);
	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton onClick={onMenuButtonClick(true)} aria-label="MenuDrawer" color="secondary">
					<MenuIcon />
				</IconButton>
				<StyledTypography variant="title" color="secondary">
					{title}
				</StyledTypography>
				<Button variant="flat" color="secondary" onClick={logout}>
					LOGOUT
				</Button>
			</Toolbar>
		</AppBar>
	);
};

const mapDispatchToProps = {
	logout
};

export default withRouter(connect(null, mapDispatchToProps)(Header));
