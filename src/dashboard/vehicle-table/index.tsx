import React, { useState } from 'react';
import styled from '@emotion/styled';
import VehicleInterface from '../../interfaces/VehicleInterface';
import Button from '../../components/Button';
import colors from '../../colors';
import { format } from 'date-fns';
import MapModal from '../../components/map/MapModal';

type Props = {
  vehicleList: VehicleInterface[];
  isLoading: boolean;
  onEditVehicle: (v: VehicleInterface) => void;
};

const VehicleTable = ({ vehicleList, isLoading, onEditVehicle }: Props) => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleInterface>();

  const renderLoader = () => (
    <TableRow>
      <EmptyCell colSpan={4}>Loading...</EmptyCell>
    </TableRow>
  );

  const renderEmpty = () => (
    <TableRow>
      <EmptyCell colSpan={4}>No records... Start by adding some!</EmptyCell>
    </TableRow>
  );

  const showMap = (vehicle: VehicleInterface) => {
    setSelectedVehicle(vehicle);
    setIsMapModalOpen(true);
  };

  const edit = (vehicle: VehicleInterface) => {
    onEditVehicle(vehicle);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <tr>
            <HeaderCell>Name</HeaderCell>
            <HeaderCell>Type</HeaderCell>
            <HeaderCell>Last Successful Connection</HeaderCell>
            <HeaderCell>Actions</HeaderCell>
          </tr>
        </TableHeader>
        <TableBody>
          {isLoading && renderLoader()}
          {vehicleList?.length === 0 && !isLoading && renderEmpty()}

          {vehicleList?.length > 0 &&
            !isLoading &&
            vehicleList.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <Cell>{vehicle.vehicleName}</Cell>
                <Cell>{vehicle.carType}</Cell>
                <Cell>
                  {format(
                    new Date(vehicle.lastSuccessfulConnection),
                    'd LLL yyyy HH:mm',
                  )}
                </Cell>
                <ActionsCell>
                  <Button
                    onClick={() => edit(vehicle)}
                    text="Edit"
                    bgColor={colors.MID_GREY}
                    size="small"
                  />
                  <Button
                    onClick={() => showMap(vehicle)}
                    text=" Show on map"
                    bgColor={colors.RED}
                    size="small"
                  />
                </ActionsCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        markersPositions={
          selectedVehicle ? [selectedVehicle?.lastGeolocationPoint] : []
        }
      />
    </>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: ${colors.GREEN};
  border-bottom: 1px solid ${colors.DARK_GREEN};
  height: 40px;
  color: #ffffff;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid ${colors.DARK_GREEN};
  height: 40px;

  &:last-child {
    border-bottom: none;
  }
`;

const HeaderCell = styled.th`
  text-align: left;
  padding-left: 10px;
`;

const Cell = styled.td`
  text-align: left;
  padding-left: 10px;
`;

const EmptyCell = styled.td`
  height: 100px;
  padding-left: 10px;
`;

const ActionsCell = styled(Cell)`
  display: flex;
  gap: 5px;
  align-items: center;
  height: 38px;
`;

export default VehicleTable;
