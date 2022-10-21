export enum CarType {
  SUV = 'SUV',
  Truck = 'Truck',
  Hybrid = 'Hybrid',
}

export type GeolocationPoint = {
  lat: string;
  lng: string;
};

interface Vehicle {
  id: string;
  vehicleName: string;
  createdAt: string;
  carType: CarType;
  lastSuccessfulConnection: string;
  lastGeolocationPoint: GeolocationPoint;
}

export default Vehicle;
