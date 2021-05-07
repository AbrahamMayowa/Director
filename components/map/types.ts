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
    toggleModal: Function
}

export interface IAutoCompleteProps {
    handleVisible: Function;
    addressOnClick: Function;
    visibleBoolean: boolean;
}

export interface PlaceDetails {
    description: object;
  }
  
  export interface PlaceResponse {
    predictions: PlaceDetails[];
  }
  
  export interface Places {
    googlePlaces: PlaceResponse;
    loading: boolean;
    error: string;
  }