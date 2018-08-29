import React from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';

// Components
import LoginForm from './components/login-form/LoginForm';

const LogInPageContainer = styled.div`
  background-color: ${prop('theme.colors.primary')}
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 900px;
`;

const LogInPage = () => (
  <LogInPageContainer>
    <LoginForm />
  </LogInPageContainer>
);

export default LogInPage;
