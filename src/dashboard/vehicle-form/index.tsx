import React from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import Button from '../../components/Button';
import MapInput from './MapInput';

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
    backgroundColor: '#FAFAFA',
    maxHeight: '100%',
    overflow: 'auto',
  },
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

enum CarType {
  SUV = 'SUV',
  Truck = 'Truck',
  Hybrid = 'Hybrid',
}

const VehicleForm = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

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
          <Button bgColor="green" type="submit" text="Save" />
          <Button
            bgColor="grey"
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
  color: red;
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default VehicleForm;
