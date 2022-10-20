import React from 'react';
import styled from '@emotion/styled'

const App = () => {
  return (
    <AppContainer>
      <Button>Hello!</Button>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`

export default App;
