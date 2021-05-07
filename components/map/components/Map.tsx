import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import Config from "react-native-config";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {UserLocation} from '../types';
import {initMapbox} from '../../../helper'
import MapCamera from './MapCamera';
import {USER_MAKER_COLOR} from '../constants';
import AutoComplete from './AutoComplete';



const Map = () => {

  initMapbox()
  
    
  const [userLocation, setUserLocation] = useState<UserLocation>({
    longitude: null,
    latitude: null
  })

  const [visibleModal, setVisibleModal] = useState<boolean>(false)

  const toggleModal = () => {
    setVisibleModal(prev => !prev);
  };

  // handle realtime update of user location
  const handleUserLocation = (latitude: number, longitude: number) => {
    setUserLocation({
      latitude,
      longitude
    })
  }

  const handlePlaceValue = (address: string) => {
    console.log(address)
  };
    
    return (
        <View style={styles.page}>
        <AutoComplete
        handleVisible={toggleModal}
        addressOnClick={handlePlaceValue}
        visibleBoolean={visibleModal}
        />
        <MapboxGL.UserLocation onUpdate={ (location) => handleUserLocation(location.coords.latitude, location.coords.longitude)}/>
        {(userLocation.longitude && userLocation.latitude) ? (
          <MapCamera latitude={userLocation.latitude} longitude={userLocation.longitude} toggleModal={toggleModal}/>
        ) : (
          <ActivityIndicator color={USER_MAKER_COLOR} size={50}/>
        )}
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
    }
  });