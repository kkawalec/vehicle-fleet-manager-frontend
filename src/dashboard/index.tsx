import React, { useState } from 'react';
import VehicleForm from './vehicle-form';
import styled from '@emotion/styled';

const Dashboard = () => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  return (
    <Wrapper>
      <Header>
        <HeaderText>Vehicle Fleet Manager</HeaderText>
        <AddButton onClick={() => setIsEditFormOpen(true)}>Add new</AddButton>
      </Header>

      <VehicleForm
        isOpen={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-width: 700px;
  border: 1px solid green;
  padding: 20px;
  border-radius: 4px;
`;

const Header = styled.div`
  display: flex;
`;

const HeaderText = styled.h2``;

const AddButton = styled.button`
  padding: 2px 6px;
  background: green;
  color: white;
`;

export default Dashboard;
