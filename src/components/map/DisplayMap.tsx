import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import styled from '@emotion/styled';
import { Map, Marker } from './helpers';
import { GeolocationPoint } from '../../interfaces/VehicleInterface';

interface Props {
  markersPositions: GeolocationPoint[];
  initialZoom?: number;
}

const DisplayMap = ({ markersPositions, initialZoom = 5 }: Props) => {
  const [zoom, setZoom] = React.useState(initialZoom);
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: markersPositions[0]?.lat || 0,
    lng: markersPositions[0]?.lng || 0,
  });

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  return (
    <MapContainer>
      <Wrapper apiKey={'AIzaSyBDtb8Oni7Fqslb3LfwAc088cB2zsIW-H4'}>
        <Map
          center={center}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: '1', height: '400px', width: '400px' }}
        >
          {markersPositions.map((markerPosition: any) => (
            <Marker
              position={markerPosition}
              key={markerPosition.lng + markerPosition.lat}
            />
          ))}
        </Map>
      </Wrapper>
    </MapContainer>
  );
};
const MapContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 10px;
`;

export default DisplayMap;
