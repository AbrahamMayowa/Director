import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";
import {initMapbox} from '../../../helper'
import {IDirectionProps} from '../types';
import {USER_MAKER_COLOR} from '../constants'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Direction = ({
    starting,
    destination
}:IDirectionProps) => {

    initMapbox()
    const startDestinationPoints = [starting, destination]

    return (
        startDestinationPoints.map((point, index) => (
        
        <MapboxGL.MarkerView
            key={`${index}-marker`}
            id={`${index}-marker`}
            coordinate={point}>
            <View style={styles.userPoint}>
          <Icon name="map-marker-outline" size={30} color={USER_MAKER_COLOR} />
          </View>
        </MapboxGL.MarkerView>
    ))
    )
};

const styles = StyleSheet.create({
    userPoint: {
        height: 30, 
        width: 30,

    }
})

export default Direction;