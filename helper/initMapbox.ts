import MapboxGL from '@react-native-mapbox-gl/maps';
import Config from 'react-native-config';

// initialized mapbox instance
export const initMapbox = () => {
  MapboxGL.setAccessToken(Config.MAPBOX_PUBLIC_KEY);
};
