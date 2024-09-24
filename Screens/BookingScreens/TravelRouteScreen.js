import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import COLOR from '../../Constants/Colors';
import Button from '../../components/Buttons/Button';
import CancelButton from '../../components/Buttons/CancelButton';
import CustomModal from '../../components/Modal/CustomModal';
import images from '../../Constants/Images';


const { width, height } = Dimensions.get('window');

const TravelRouteScreen = ({ navigation }) => {
  const [openOrigin, setOpenOrigin] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [openDestination, setOpenDestination] = useState(false);
  const [destination, setDestination] = useState(null);

  const handleNext = () => {
    if (origin && destination) {
      navigation.navigate("TicketBookingScreen")
    } else {
      Alert.alert('Incomplete', 'Please fill in both fields.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Wave Image */}
      <View style={styles.imageContainer}>
        <Image width={width} style={styles.wave} source={images.wave} />
      </View>

      {/* Screen Content */}
      <View style={styles.contentWrapper}>
        <View>
          <Text style={styles.stepText}>Step 1 of 4</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Travel Route</Text>

          {/* Dropdown for Origin */}
          <View>
            <Text style={styles.text}>Where are you travelling from?</Text>
            <DropDownPicker
              open={openOrigin}
              value={origin}
              items={[
                { label: 'Buea', value: 'buea' },
                { label: 'Bamenda', value: 'bamenda' },
                { label: 'Limbe', value: 'Limbe' },
                { label: 'Yaounde', value: 'yaounde' },
              ]}
              setOpen={setOpenOrigin}
              setValue={setOrigin}
              style={styles.dropdown}
              placeholder="Departure Location"
              containerStyle={styles.dropdownContainer}
              onPress={() => setOpenOrigin(true)}
            />
            <CustomModal
              visible={openOrigin}
              onClose={() => setOpenOrigin(false)}
              items={[
                { label: 'Buea', value: 'buea' },
                { label: 'Bamenda', value: 'bamenda' },
                { label: 'Limbe', value: 'Limbe' },
                { label: 'Yaounde', value: 'yaounde' },
              ]}
              onSelect={setOrigin}
              placeholder="Select Origin"
            />
          </View>

          {/* Dropdown for Destination */}
          <View>
            <Text style={styles.text}>Where would you like to go?</Text>
            <DropDownPicker
              open={openDestination}
              value={destination}
              items={[
                { label: 'San Francisco', value: 'san_francisco' },
                { label: 'Miami', value: 'miami' },
                { label: 'Chicago', value: 'chicago' },
                { label: 'Boston', value: 'boston' },
                { label: 'Seattle', value: 'seattle' },
              ]}
              setOpen={setOpenDestination}
              setValue={setDestination}
              style={styles.dropdown}
              placeholder="Travel Destination"
              containerStyle={styles.dropdownContainer}
              onPress={() => setOpenDestination(true)}
            />
            <CustomModal
              visible={openDestination}
              onClose={() => setOpenDestination(false)}
              items={[
                { label: 'Yaounde', value: 'yaounde' },
                { label: 'Bamenda', value: 'bamenda'},
                { label: 'Dschang', value: 'dschang' },
                { label: 'Bafoussam', value: 'bafoussam' },
                { label: 'Douala', value: 'Douala' },
              ]}
              onSelect={setDestination}
              placeholder="Select Destination"
            />
          </View>
        </View>

        {/* Buttons at the Bottom */}
        <View style={styles.buttonContainer}>
          <CancelButton onPress={() => navigation.replace('ServiceScreen')} />
          <Button text="Next" onPress={handleNext} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    width: width,
    zIndex: 1,
  },
  contentWrapper: {
    flex: 1,
    padding: 20,
    zIndex: 2,
    marginTop: 80,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  stepText: {
    color: 'white',
    fontSize: 14,
  },
  wave: {
    height: height * 0.4,
    width: width,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    alignSelf: 'flex-start',
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TravelRouteScreen;
