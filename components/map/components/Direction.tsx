import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";
import {initMapbox} from '../../../helper'
import {USER_MAKER_COLOR} from '../constants'
import {IDirectionProps} from '../types';


const Direction = ({
    starting,
    destination
}:IDirectionProps) => {

    initMapbox()

    return (
        <>
            <MapboxGL.PointAnnotation
                key="pointAnnotation"
                id="pointAnnotation"
                coordinate={[starting[0], starting[1]]}>
                <View style={styles.userPoint}/>
              </MapboxGL.PointAnnotation>

              <MapboxGL.MarkerView
                id='dedje'
                key='dedje'
                coordinate= {[-122.0836272, 37.4226667]}
              >
               <MapboxGL.Camera zoomLevel={9} centerCoordinate={[-122.0836272, 37.4226667]} />   
              </MapboxGL.MarkerView>

             
        </>

            );
};

const styles = StyleSheet.create({
    userPoint: {
        height: 30, 
        width: 30, 
        backgroundColor: USER_MAKER_COLOR, 
        borderRadius: 50, 
        borderColor: '#fff', 
        borderWidth: 3
    }
})

export default Direction;