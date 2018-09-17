import React from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';

import Logo from '../../assets/images/logo.png';
// Components
import LoginForm from './components/login-form/LoginForm';

const LogInPageContainer = styled.div`
  background-color: ${prop('theme.colors.primary')}
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 900px;
`;
const ImageContainer = styled.div``;

const LogInPage = () => (
	<LogInPageContainer>
		<LoginForm />
		<ImageContainer>
			<img src={Logo} width="600" />
		</ImageContainer>
	</LogInPageContainer>
);

export default LogInPage;
