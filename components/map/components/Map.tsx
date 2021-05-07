import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native';
import Config from "react-native-config";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {requestPermission, subscribeToLocationUpdates, configure} from 'react-native-location';
import {UserLocation} from '../types';
import {initMapbox} from '../../../helper'
import UserAnnotation from './UserAnnotation';



const Map = () => {

  initMapbox()
  
    
  const [] = useState<UserLocation>({
    longitude: null,
    latitude: null
  })
    
    return (
        <View style={styles.page}>
        <View style={styles.container}>
            
        <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
            zoomLevel={11}
            centerCoordinate={[3.3362400, 6.5790100]}
            animationMode={'flyTo'}
            animationDuration={0}
          >
          </MapboxGL.Camera>

          <UserAnnotation />
        <MapboxGL.UserLocation />
        </MapboxGL.MapView>

          </View>
        
      </View>
    );
};

export default Map;

const styles = StyleSheet.create({
    page: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    },
    container: {
      height: '100%',
      width: '100%',
    },
    map: {
      flex: 1
    }
  });