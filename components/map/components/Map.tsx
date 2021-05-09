import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Config from "react-native-config";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {UserLocation, IDestinationAPI} from '../types';
import {initMapbox} from '../../../helper'
import MapCamera from './MapCamera';
import {
  USER_MAKER_COLOR, 
  ERROR_OCCURED,
  NETWORK_ERROR,
  NO_INTERNET,
  NO_DIRECTION
} from '../constants';
import AutoComplete from './AutoComplete';



const Map = () => {

  initMapbox()
  
    
  const [userLocation, setUserLocation] = useState<UserLocation>({
    longitude: null,
    latitude: null
  })

  const [visibleModal, setVisibleModal] = useState<boolean>(false)

  const [destinationAPI, setDestinationAPI] = useState<IDestinationAPI>({
    loading: false,
    latitude: null,
    longitude: null,
    destination: null,

  })

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




  /**
   *
   * @param placeValue
   * @description handle fetching of api call to google direction api
   */
  const fetchGoogleDirection = async (destination: string) => {
    try {
        setDestinationAPI({
          ...destinationAPI,
          loading: true
        })
        const googleDirection = `https://maps.googleapis.com/maps/api/directions/json?origin=${userLocation.latitude},${userLocation.longitude}&destination=${destination}&key=${Config.GOOGLE_PLACE_API}`
        const res = await fetch(googleDirection);
        if (!res.ok) {
          setDestinationAPI({
            ...destinationAPI,
            loading: false
          });
          Alert.alert(ERROR_OCCURED)
        } else {
        const direction = await res.json();
        if (direction.routes.length >= 1) {
          const routes = direction.routes[0].legs[0]
          console.log(routes.start_location)
          setDestinationAPI({
            ...destinationAPI,
            loading: false,
            latitude: routes.end_location.lat,
            longitude: routes.end_location.lng
          })
          setUserLocation({
            longitude: routes.start_location.lng,
            latitude: routes.start_location.lat
          })
        } else {
          Alert.alert(NO_DIRECTION)
        }
        
      }
    } catch (err) {
      if (err.message === NETWORK_ERROR) {
        Alert.alert(NO_INTERNET)
      } else {
        Alert.alert(ERROR_OCCURED)
        console.log(err)
      }
    }
  };


  const handlePlaceValue = (address: string) => {
   // console.log(address)
    setDestinationAPI({
      ...destinationAPI,
      destination: address
    })
    // fetch the direction
    fetchGoogleDirection(address)
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
          <MapCamera 
          latitude={userLocation.latitude} 
          longitude={userLocation.longitude} 
          toggleModal={toggleModal} 
          starting={[userLocation.longitude, userLocation.latitude]}
          destination={[destinationAPI.longitude, destinationAPI.latitude]}
          />
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