import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    ActivityIndicator,
    TextInput
} from 'react-native';
import Config from "react-native-config";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {initMapbox} from '../../../helper'
import UserAnnotation from './UserAnnotation';
import {IUserLocationProps} from '../types';
import placeSearch from '../../../assets/files/placeSearch.png';



const MapCamera = ({
    latitude,
    longitude
}: IUserLocationProps) => {

  initMapbox()
  
    
    return (
        <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
            zoomLevel={14}
            centerCoordinate={[longitude, latitude]}
            animationMode={'flyTo'}
            animationDuration={0}
          >
          </MapboxGL.Camera>
          <UserAnnotation longitude={longitude} latitude={latitude}/>
          
        </MapboxGL.MapView>

          </View>
    );
};


const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
    },
    map: {
      flex: 1
    }
  });

export default MapCamera;