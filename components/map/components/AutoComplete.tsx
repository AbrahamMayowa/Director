import React, {useState, createRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {IAutoCompleteProps, Places, PlaceResponse} from '../types';
import Config from 'react-native-config';
import {PLACEHOLDER, NETWORK_ERROR, NO_INTERNET, CANCEL} from '../constants';
import map from '../../../assets/files/placeSearch.png';
import cancelMap from '../../../assets/files/cancel.png';
import {USER_MAKER_COLOR} from '../constants';

const AddressAutoComplete = ({
  handleVisible,
  addressOnClick,
  visibleBoolean,
}: IAutoCompleteProps) => {
  const [places, setPlaces] = useState<Places>({
    googlePlaces: {
      predictions: [],
    },
    loading: false,
    error: '',
  });

  const {googlePlaces, loading, error} = places;

  const searchInput: any = createRef();

  /**
   *
   * @param placeValue
   * @description handle fetching of api call to google place autoComplete
   */
  const fetchGooglePlaces = async (placeValue: string) => {
    try {
      if (placeValue.length > 1) {
        setPlaces({
          ...places,
          loading: true,
        });
        const googleMapUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${placeValue}&key=${Config.GOOGLE_PLACE_API}`;
        const res = await fetch(googleMapUrl);
        const placeValues: PlaceResponse = await res.json();
        setPlaces({
          ...places,
          googlePlaces: placeValues,
          loading: false,
        });
      }
    } catch (err) {
      if (err.message === NETWORK_ERROR) {
        setPlaces({
          ...places,
          loading: false,
          error: NO_INTERNET,
        });
      }
    }
  };

  let placeElement;
  if (loading) {
    placeElement = (
      <ActivityIndicator
        style={styles.searchingIndicator}
        color={USER_MAKER_COLOR}
        size={30}
      />
    );
  } else if (!loading && error) {
    placeElement = <Text style={styles.placeError}>{error}</Text>;
  } else {
    placeElement = googlePlaces.predictions.map((el, i) => (
      <TouchableOpacity
        key={i}
        style={styles.addressItem}
        onPress={() => {
          addressOnClick(el.description);
          handleVisible();
        }}>
        <Text style={styles.addressText}>{el.description} </Text>
      </TouchableOpacity>
    ));
  }

  return (
    <Modal
      isVisible={visibleBoolean}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <View style={styles.modalWrapper}>
        <View style={styles.containerWrapper}>
          <View style={styles.inputFieldWrapper}>
            <Image source={map} style={styles.mapIcon} />
            <TextInput
              onChangeText={(text: string) => {
                fetchGooglePlaces(text);
              }}
              placeholder={PLACEHOLDER}
              autoFocus
              style={styles.autoCompleteInput}
              ref={searchInput}
            />

            <TouchableOpacity onPress={() => searchInput.current.clear()}>
              <Image source={cancelMap} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelTextWrapper}
              onPress={() => handleVisible()}>
              <Text style={styles.cancelText}>{CANCEL}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>{placeElement}</ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const widthDimension = Dimensions.get('window').width;

const styles = StyleSheet.create({
  modalWrapper: {
    width: widthDimension,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '10%',
    marginTop: -30,
    marginBottom: -30,
  },
  containerWrapper: {
    width: widthDimension,
    backgroundColor: '#F6F8FA',
    height: '100%',
    alignItems: 'center',
  },
  inputFieldWrapper: {
    backgroundColor: '#ffffff',
    width: widthDimension * 0.95,
    borderRadius: 35,
    borderColor: '#EEEEEE',
    alignSelf: 'center',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingLeft: 12,
    overflow: 'hidden',
    paddingHorizontal: 12,
    marginTop: 25,
  },
  autoCompleteInput: {
    width: '65%',
  },
  cancelTextWrapper: {
    marginLeft: 8,
    borderLeftWidth: 0.5,
    paddingLeft: 4,
  },
  cancelText: {
    color: '#ACAFC3',
    fontSize: 16,
  },
  mapIcon: {
    marginRight: 8,
  },
  addressItem: {
    width: widthDimension * 0.9,
    height: 45,
    marginTop: 15,
    borderColor: '#EAECF4',
    borderBottomWidth: 1,
  },
  addressText: {
    fontSize: 14,
    color: '#A3AAB5',
  },
  searchingIndicator: {
    marginTop: 40,
  },
  placeError: {
    alignSelf: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'red',
  },
});

export default AddressAutoComplete;
