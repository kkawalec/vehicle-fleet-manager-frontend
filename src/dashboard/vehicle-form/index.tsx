import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import Button from '../../components/Button';
import MapInput from '../../components/map/MapInput';
import axios from 'axios';
import colors from '../../colors';
import { CarType } from '../../interfaces/VehicleInterface';
import { customModalStyles } from '../../components/helpers';
import VehicleInterface from '../../interfaces/VehicleInterface';
import { format } from 'date-fns';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  selectedVehicle: VehicleInterface | null;
};

const VehicleForm = ({ isOpen, onClose, onEdit, selectedVehicle }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleLocation, setVehicleLocation] = useState(
    selectedVehicle?.lastGeolocationPoint || null,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (selectedVehicle) {
      reset(selectedVehicle);
      setVehicleLocation(selectedVehicle?.lastGeolocationPoint);
    }
  }, [reset, selectedVehicle]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const url = `https://boiling-eyrie-36583.herokuapp.com/${selectedVehicle?.id || ''}`;

      await axios.post(url, data);
      onEdit();
      onClose();
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customModalStyles}
      contentLabel="Vehicle Form"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label htmlFor="vehicleName">Vehicle Name</Label>
          <Input {...register('vehicleName', { required: true })} />
          {errors.vehicleName && (
            <ErrorMessage>Vehicle name is required</ErrorMessage>
          )}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="carType">Car Type</Label>
          <Select {...register('carType', { required: true })}>
            <option />
            {[CarType.Hybrid, CarType.SUV, CarType.Truck].map(
              (type: CarType) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ),
            )}
          </Select>
          {errors.carType && <ErrorMessage>Car type is required</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="lastSuccessfulConnection">
            Last Successful Connection
          </Label>
          <Input
            type="datetime-local"
            {...register('lastSuccessfulConnection')}
          />
        </InputGroup>

        <MapInput
          setValue={setValue}
          startingLocation={vehicleLocation}
          {...register('lastGeolocationPoint')}
        />

        {selectedVehicle && (
          <InputGroup>
            <Text>UUID: {selectedVehicle.id}</Text>
            <Text>
              Created at:{' '}
              {format(new Date(selectedVehicle.createdAt), 'd LLL yyyy HH:mm')}
            </Text>
          </InputGroup>
        )}

        <FormFooter>
          <Button
            bgColor={colors.GREEN}
            type="submit"
            text="Save"
            disabled={isLoading}
          />
          <Button
            bgColor={colors.MID_GREY}
            type="button"
            onClick={closeModal}
            text="Close"
          />
        </FormFooter>
      </Form>
    </Modal>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid grey;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid grey;
  border-radius: 4px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: ${colors.RED};
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.p`
  margin: 0;
  font-size: 12px;
`;

export default VehicleForm;
