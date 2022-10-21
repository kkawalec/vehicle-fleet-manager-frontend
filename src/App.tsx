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
  padding: 20px;
`;

export default App;
