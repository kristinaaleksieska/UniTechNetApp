import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const ProgressContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 900px;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = () => (
  <ProgressContainer>
    <CircularProgress color="primary" size={200} />
  </ProgressContainer>
);

export default Loading;
