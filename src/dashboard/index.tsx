import React, { useEffect, useState } from 'react';
import VehicleForm from './vehicle-form';
import VehicleTable from './vehicle-table';
import MapModal from '../components/map/MapModal';
import styled from '@emotion/styled';
import Button from '../components/Button';
import colors from '../colors';
import axios from 'axios';
import Vehicle from '../interfaces/VehicleInterface';

const Dashboard = () => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const loadVehicles = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        'https://boiling-eyrie-36583.herokuapp.com/vehicles',
      );
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

  const onEditVehicle = (v: Vehicle) => {
    setSelectedVehicle(v);
    setIsEditFormOpen(true);
  };

  const handleCloseVehicleForm = () => {
    setIsEditFormOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <>
      <Header>
        <HeaderText>Vehicle Fleet Manager</HeaderText>
        <HeaderButtons>
          <Button
            onClick={() => setIsMapOpen(true)}
            text="Map"
            bgColor={colors.RED}
          />

          <Button
            onClick={() => setIsEditFormOpen(true)}
            text="Add new"
            bgColor={colors.GREEN}
          />
        </HeaderButtons>
      </Header>

      <Wrapper>
        <VehicleTable
          vehicleList={vehicleList}
          isLoading={isLoading}
          onEditVehicle={onEditVehicle}
        />
      </Wrapper>

      {isEditFormOpen && (
        <VehicleForm
          isOpen={isEditFormOpen}
          onClose={handleCloseVehicleForm}
          onEdit={loadVehicles}
          selectedVehicle={selectedVehicle}
        />
      )}

      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        markersPositions={vehicleList.map(
          (v: Vehicle) => v.lastGeolocationPoint,
        )}
        initialZoom={2}
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
  padding: 20px;
  background-color: ${colors.LIGHT_GREY};
  border-bottom: 1px solid ${colors.GREEN};
`;

const HeaderButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const HeaderText = styled.h2`
  margin: 0;
`;

export default Dashboard;
