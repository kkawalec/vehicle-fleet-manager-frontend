import React, { useEffect, useState } from 'react';
import VehicleForm from './vehicle-form';
import VehicleTable from './vehicle-table';
import styled from '@emotion/styled';
import Button from '../components/Button';
import colors from '../colors';
import axios from 'axios';

const Dashboard = () => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [vehicleList, setVehicleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadVehicles = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/vehicles');
      setVehicleList((res as any).data);
    } catch (e) {
      // do nothing
      // table should displayed "empty" state
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  return (
    <>
      <Header>
        <HeaderText>Vehicle Fleet Manager</HeaderText>
        <Button
          onClick={() => setIsEditFormOpen(true)}
          text="Add new"
          bgColor={colors.GREEN}
        />
      </Header>

      <Wrapper>
        <VehicleTable vehicleList={vehicleList} isLoading={isLoading} />
      </Wrapper>

      <VehicleForm
        isOpen={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        onEdit={loadVehicles}
      />
    </>
  );
};

const Wrapper = styled.div`
  min-width: 700px;
  border: 1px solid ${colors.GREEN};
  padding: 0;
  margin: 20px;
  border-radius: 4px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${colors.LIGHT_GREY};
  border-bottom: 1px solid ${colors.GREEN};
`;

const HeaderText = styled.h2`
  margin: 0;
`;

export default Dashboard;
