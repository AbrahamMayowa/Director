import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {IDirectionProps} from '../types';
import {USER_MAKER_COLOR} from '../constants';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Direction = ({starting, destination}: IDirectionProps) => {
  return (
    <>
      <MapboxGL.MarkerView key="starting" id="startingId" coordinate={starting}>
        <View style={styles.userPoint}>
          <Icon name="map-marker-outline" size={30} color={USER_MAKER_COLOR} />
        </View>
      </MapboxGL.MarkerView>

      <MapboxGL.MarkerView
        key="destination"
        id="destinationId"
        coordinate={destination}>
        <View style={styles.userPoint}>
          <Icon name="map-marker-outline" size={30} color={USER_MAKER_COLOR} />
        </View>
      </MapboxGL.MarkerView>
    </>
  );
};

const styles = StyleSheet.create({
  userPoint: {
    height: 30,
    width: 30,
  },
});

export default Direction;
