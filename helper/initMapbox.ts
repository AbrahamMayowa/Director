import React from 'react';
import MapboxGL from "@react-native-mapbox-gl/maps";



// initialized mapbox instance
export const initMapbox = () => {
    MapboxGL.setAccessToken('pk.eyJ1IjoibWF5b3JmdWxsc3RhY2siLCJhIjoiY2tvYjlpcTRyMDV0ejJ1bjF0dzB6a2t0aCJ9.keT6gKvnopdHW_KjDcvFNA');
}
