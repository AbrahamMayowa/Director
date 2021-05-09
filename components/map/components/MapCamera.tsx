import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    ActivityIndicator,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';
import Config from "react-native-config";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {initMapbox} from '../../../helper'
import UserAnnotation from './UserAnnotation';
import {
  IMapCameralProps,
  CordinateArrayType
} from '../types';
import placeSearch from '../../../assets/files/placeSearch.png';
import {PLACEHOLDER} from '../constants';
import Direction from './Direction';



const MapCamera = ({
    latitude,
    longitude,
    toggleModal,
    starting,
    destination
}: IMapCameralProps) => {

  initMapbox()
  //console.log(destination)
  const shapeTest: any = {
  
      type: 'Feature',
      properties: {
        icon: 'exampleIcon',
      },
      geometry: {
        type: 'LineString',
        coordinates: [[-120.084990,37.426929],[-122.0836272, 37.4226667]]
      }
  }
    
    return (
        <View style={styles.container}>
        <View style={styles.textInput} >
            <Image source={placeSearch} />
            <TouchableOpacity style={styles.textPlaceHolderWrapper} onPress={() => toggleModal()}>
            <Text style={styles.inputPlaceholder}>{PLACEHOLDER}</Text>
            </TouchableOpacity>
            
        </View>
        <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
            zoomLevel={11}
            centerCoordinate={[longitude, latitude]}
            animationMode='moveTo'
            animationDuration={0}
          >
          </MapboxGL.Camera>

          <UserAnnotation longitude={longitude} latitude={latitude} />
     
            <Direction starting={starting as CordinateArrayType} destination={destination as CordinateArrayType} />
          
            <MapboxGL.ShapeSource id='shapeSource' shape={shapeTest}>
              <MapboxGL.LineLayer id='lineLayer' style={{lineWidth: 5, lineJoin: 'bevel', lineColor: '#ff0000'}} />
            </MapboxGL.ShapeSource>
          
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
    },
    textInput: {
      position: 'absolute',
      top: 20,
      zIndex: 12,
      backgroundColor: '#ffffff',
      width: '95%',
      borderRadius: 35,
      borderColor: '#EEEEEE',
      alignSelf: 'center',
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
      paddingLeft: 12
    },
    textPlaceHolderWrapper: {
      width: '90%',
      height: '100%',
      justifyContent: 'center'
    },
    inputPlaceholder: {
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 15,
    }
  });

export default MapCamera;