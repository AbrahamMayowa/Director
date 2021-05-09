import React, {useState} from 'react';
import {
    View,
    StyleSheet,
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
import Spinner from 'react-native-loading-spinner-overlay';



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

  // bound camera to certain cordinate
  const cameraBound = (boundRef: any) => {
    boundRef.current.fitBounds([userLocation.longitude, userLocation.latitude],[destinationAPI.longitude, destinationAPI.latitude])
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
          setDestinationAPI({
            ...destinationAPI,
            loading: false
          });
          Alert.alert(NO_DIRECTION)
        }
        
      }
    } catch (err) {
      setDestinationAPI({
        ...destinationAPI,
        loading: false
      });
      if (err.message === NETWORK_ERROR) {
        Alert.alert(NO_INTERNET)
      } else {
        Alert.alert(ERROR_OCCURED)
      }
    }
  };


  const handlePlaceValue = (address: string) => {
    setDestinationAPI({
      ...destinationAPI,
      destination: address
    })
    // fetch the direction
    fetchGoogleDirection(address)
  };
    
    return (
        <View style={styles.page}>
        <Spinner
        visible={destinationAPI.loading}
        children={<ActivityIndicator style={styles.indicatorStyle} size={70} color={USER_MAKER_COLOR}/>}
        animation='slide'
      />
        <AutoComplete
        handleVisible={toggleModal}
        addressOnClick={handlePlaceValue}
        visibleBoolean={visibleModal}
        />
        <MapboxGL.UserLocation onUpdate={ (location) => handleUserLocation(location.coords.latitude, location.coords.longitude)}/>
        {(userLocation.longitude && userLocation.latitude) ? (
          <MapCamera
          handleCameraBound={cameraBound}
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
    },
    indicatorStyle: {
      flex: 1,
    },
  });