import React, { useState } from 'react';
import styled from '@emotion/styled';
import VehicleInterface from '../../interfaces/VehicleInterface';
import Button from '../../components/Button';
import colors from '../../colors';
import { format } from 'date-fns';

type Props = {
  vehicleList: VehicleInterface[];
  isLoading: boolean;
};

const VehicleTable = ({ vehicleList, isLoading }: Props) => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleInterface>();

  const renderLoader = () => (
    <tr>
      <td>Loading...</td>
    </tr>
  );

  const renderEmpty = () => (
    <tr>
      <td>No records</td>
    </tr>
  );

  const showMap = (vehicle: VehicleInterface) => {
    setSelectedVehicle(vehicle);
    setIsMapModalOpen(true);
  };

  return (
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
              <Cell>
                <Button text="Edit" bgColor={colors.MID_GREY} size="small" />
                <ShowOnMapLink onClick={() => showMap(vehicle)}>
                  Show on map
                </ShowOnMapLink>
              </Cell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
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

const ShowOnMapLink = styled.a`
  color: ${colors.DARK_GREEN};
  margin-left: 10px;
  text-decoration: underline;
  cursor: pointer;
`;

export default VehicleTable;
