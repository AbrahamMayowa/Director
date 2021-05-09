import React, {useRef, useEffect} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
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
import {USER_MAKER_COLOR} from '../constants'




const MapCamera = ({
    latitude,
    longitude,
    toggleModal,
    starting,
    destination,
    handleCameraBound,
}: IMapCameralProps) => {


  initMapbox()

  const cameraRaf:any = useRef()
  const shapeTest: any = {
  
      type: 'Feature',
      properties: {
        icon: 'exampleIcon',
      },
      geometry: {
        type: 'LineString',
        coordinates: [starting,destination]
      }
  }

  // bound camera zoom level to certain condinate
  useEffect(() => {
    if (destination[0]) {
      handleCameraBound(cameraRaf)
    }
    
  }, [destination[0]])





    
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
            ref={cameraRaf}
            centerCoordinate={[longitude, latitude]}
            animationMode='moveTo'
            animationDuration={0}
          >
          </MapboxGL.Camera>

          

          {destination[0] ? <View>
            <Direction starting={starting as CordinateArrayType} destination={destination as CordinateArrayType} />
          
            <MapboxGL.ShapeSource id='shapeSource' shape={shapeTest}>
              <MapboxGL.LineLayer id='lineLayer' style={{lineWidth: 4, lineJoin: 'bevel', lineColor: USER_MAKER_COLOR}} />
            </MapboxGL.ShapeSource>
            </View> : <UserAnnotation longitude={longitude} latitude={latitude} />}
     
            
          
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