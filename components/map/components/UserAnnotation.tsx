import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";
import {USER_MAKER_COLOR} from '../constants'
import {IUserLocationProps} from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const UserAnnotation = ({
    longitude,
    latitude
}:IUserLocationProps) => {


    return (
              <MapboxGL.MarkerView
                key="user-point"
                id="user-point"
                coordinate={[longitude, latitude]}>
                <View style={styles.userPoint}>
                    <Icon name="map-marker-outline" size={30} color={USER_MAKER_COLOR} />
                </View>
              </MapboxGL.MarkerView>
            );
}

const styles = StyleSheet.create({
    userPoint: {
        height: 30, 
        width: 30, 
    }
})

export default UserAnnotation;