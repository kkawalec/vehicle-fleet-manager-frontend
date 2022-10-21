import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { createCustomEqual } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';
import styled from '@emotion/styled';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  name: string;
  setValue: (name: string, value: any, options?: Object) => void;
}

// based on https://developers.google.com/maps/documentation/javascript/react-map
const MapInput = React.forwardRef<HTMLInputElement, Props>(
  ({ name, setValue }: Props, ref) => {
    const [currentPosition, setCurrentPosition] = React.useState<
      google.maps.LatLng | null | undefined
    >();
    const [zoom, setZoom] = React.useState(3); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
      lat: 0,
      lng: 0,
    });

    const onClick = (e: google.maps.MapMouseEvent) => {
      setCurrentPosition(e.latLng);
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
        <div>
          <pre>{JSON.stringify(currentPosition?.toJSON(), null, 2)}</pre>
        </div>
      </MapContainer>
    );
  },
);

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

const Map = ({ onClick, onIdle, children, style, ...options }: MapProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName),
      );

      if (onClick) {
        map.addListener('click', onClick);
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker = (options: google.maps.MarkerOptions) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  // @ts-ignore
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // use fast-equals for other objects
    // @ts-ignore
    return deepEqual(a, b);
  },
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[],
) {
  React.useEffect(callback, [
    ...dependencies.map(useDeepCompareMemoize),
    callback,
  ]);
}

const MapContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 10px;
`;

export default MapInput;
