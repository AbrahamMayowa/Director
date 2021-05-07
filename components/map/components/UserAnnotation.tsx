import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";
import {initMapbox} from '../../../helper'
import {USER_MAKER_COLOR} from '../constants'
import {IUserLocationProps} from '../types';



const UserAnnotation = ({
    longitude,
    latitude
}:IUserLocationProps) => {
    initMapbox()

    return (
              <MapboxGL.PointAnnotation
                key="pointAnnotation"
                id="pointAnnotation"
                coordinate={[longitude, latitude]}>
                <View style={styles.userPoint}/>
              </MapboxGL.PointAnnotation>
            );
}

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

export default UserAnnotation;