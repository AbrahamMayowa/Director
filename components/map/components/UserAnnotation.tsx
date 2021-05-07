import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";
import {initMapbox} from '../../../helper'




const UserAnnotation = () => {
    initMapbox()

    return (
              <MapboxGL.PointAnnotation
                key="pointAnnotation"
                id="pointAnnotation"
                coordinate={[3.3362400, 6.5790100]}>
                <View style={{
                          height: 30, 
                          width: 30, 
                          backgroundColor: '#00cccc', 
                          borderRadius: 50, 
                          borderColor: '#fff', 
                          borderWidth: 3
                        }} />
              </MapboxGL.PointAnnotation>
            );
}

export default UserAnnotation;