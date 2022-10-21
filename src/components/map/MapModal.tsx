import React from 'react';
import Modal from 'react-modal';
import styled from '@emotion/styled';
import Button from '../../components/Button';
import colors from '../../colors';
import DisplayMap from './DisplayMap';
import { GeolocationPoint } from '../../interfaces/VehicleInterface';
import { customModalStyles } from '../helpers';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

type Props = {
  isOpen: boolean;
  onClose: () => void;
  markersPositions: GeolocationPoint[];
  initialZoom?: number;
};

const MapModal = ({
  isOpen,
  onClose,
  markersPositions,
  initialZoom,
}: Props) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} style={customModalStyles} contentLabel="Map">
      <div>
        <DisplayMap
          markersPositions={markersPositions}
          initialZoom={initialZoom}
        />
      </div>
      <Footer>
        <Button
          bgColor={colors.MID_GREY}
          type="button"
          onClick={closeModal}
          text="Close"
        />
      </Footer>
    </Modal>
  );
};

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export default MapModal;
