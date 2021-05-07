export type UserLocation = {
    longitude: number | null;
    latitude: number | null;
}

export interface IUserLocationProps {
    longitude: number;
    latitude: number;
    handlePlaceModal?: Function
}

export interface IMapCameralProps {
    longitude: number;
    latitude: number;
    handlePlaceModal: Function
}