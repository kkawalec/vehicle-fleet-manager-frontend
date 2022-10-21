import React from 'react';
import styled from '@emotion/styled';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Dashboard from './dashboard';
import NotFoundPage from './not-found';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    errorElement: <NotFoundPage />,
  },
]);

const App = () => {
  return (
    <AppContainer>
      <RouterProvider router={router} />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  padding: 0;
  margin: 0;
`;

export default App;
