import React, { useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import styled from '@emotion/styled';
import { Map, Marker } from './helpers';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  name: string;
  setValue: (name: string, value: any, options?: Object) => void;
  startingLocation: google.maps.LatLngLiteral | null;
}

// based on https://developers.google.com/maps/documentation/javascript/react-map
const MapInput = React.forwardRef<HTMLInputElement, Props>(
  ({ name, setValue, startingLocation }: Props, ref) => {
    const [currentPosition, setCurrentPosition] = React.useState<
      google.maps.LatLngLiteral | null | undefined
    >();
    const [zoom, setZoom] = React.useState(3); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
      lat: startingLocation?.lat || 0,
      lng: startingLocation?.lng || 0,
    });

    useEffect(() => {
      if (startingLocation !== currentPosition && !currentPosition) {
        setCurrentPosition(startingLocation);

        setCenter(startingLocation || { lat: 0, lng: 0 });
      }
    }, [startingLocation, currentPosition]);

    const onClick = (e: google.maps.MapMouseEvent) => {
      setCurrentPosition(e.latLng?.toJSON());
      setValue(name, e.latLng?.toJSON());
    };

    const onIdle = (m: google.maps.Map) => {
      setZoom(m.getZoom()!);
      setCenter(m.getCenter()!.toJSON());
    };

    return (
      <MapContainer>
        <input type="hidden" ref={ref} />
        <Wrapper apiKey={'AIzaSyBDtb8Oni7Fqslb3LfwAc088cB2zsIW-H4'}>
          <Map
            center={center}
            onClick={onClick}
            onIdle={onIdle}
            zoom={zoom}
            style={{ flexGrow: '1', height: '400px', width: '400px' }}
          >
            <Marker position={currentPosition} />
          </Map>
        </Wrapper>
      </MapContainer>
    );
  },
);

const MapContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 10px;
`;

export default MapInput;
