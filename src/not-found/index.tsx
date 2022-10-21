import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '../components/Button';
import colors from '../colors';

const NotFoundPage = () => {
  return (
    <Wrapper>
      <Text>It seems that you are lost...</Text>
      <Link to="/">
        <Button text="Come back" bgColor={colors.GREEN}></Button>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 300px;
  width: 100%;
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

export default NotFoundPage;
