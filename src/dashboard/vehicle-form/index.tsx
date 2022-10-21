import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import Button from '../../components/Button';
import MapInput from './MapInput';
import axios from 'axios';
import colors from '../../colors';
import { CarType } from '../../interfaces/VehicleInterface';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '400px',
    backgroundColor: colors.BG_GREY,
    maxHeight: '100%',
    overflow: 'auto',
  },
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
};

const VehicleForm = ({ isOpen, onClose, onEdit }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await axios.post('http://localhost:8000/vehicles', data);
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
    <Modal isOpen={isOpen} style={customStyles} contentLabel="Vehicle Form">
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

        <MapInput setValue={setValue} {...register('lastGeolocationPoint')} />

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

export default VehicleForm;
