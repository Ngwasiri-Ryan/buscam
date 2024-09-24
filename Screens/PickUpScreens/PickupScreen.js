import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import COLOR from "../../Constants/Colors";
import Button from "../../components/Buttons/Button";
import BackButton from "../../components/Buttons/BackButton";
import CustomModal from "../../components/Modal/CustomModal";
import images from "../../Constants/Images";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const { width, height } = Dimensions.get("window");

const PickupScreen = ({ navigation }) => {
  const [openDestination, setOpenDestination] = useState(false);
  const [destination, setDestination] = useState(null);
  const [openLocation, setOpenLocation] = useState(false);
  const [location, setLocation] = useState(null);
  const [pickupTime, setPickupTime] = useState(null);

  const handleDateChange = (event, selectedTime) => {
    if (selectedTime) {
      setPickupTime(new Date(selectedTime).toLocaleTimeString());
    }
  };

  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: handleDateChange,
      mode: "time",
      is24Hour: true,
    });
  };

  const handleNext = () => {
    navigation.navigate("PickUpInformationScreen");
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
          <Text style={styles.stepText}>Step 1 of 3</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Arrange Pickup</Text>

          {/* Dropdown for Destination */}
          <View>
            <Text style={styles.text}>Select Destination</Text>
            <DropDownPicker
              open={openDestination}
              value={destination}
              items={[
                { label: "City A", value: "city_a" },
                { label: "City B", value: "city_b" },
                { label: "City C", value: "city_c" },
              ]}
              setOpen={setOpenDestination}
              setValue={setDestination}
              style={styles.dropdown}
              placeholder="Select Destination"
              containerStyle={styles.dropdownContainer}
            />
            <CustomModal
              visible={openDestination}
              onClose={() => setOpenDestination(false)}
              items={[
                { label: "City A", value: "city_a" },
                { label: "City B", value: "city_b" },
                { label: "City C", value: "city_c" },
              ]}
              onSelect={setDestination}
              placeholder="Select Destination"
            />
          </View>

          {/* Dropdown for Current Location */}
          <View>
            <Text style={styles.text}>Select Current Location</Text>
            <DropDownPicker
              open={openLocation}
              value={location}
              items={[
                { label: "Location A", value: "location_a" },
                { label: "Location B", value: "location_b" },
                { label: "Location C", value: "location_c" },
              ]}
              setOpen={setOpenLocation}
              setValue={setLocation}
              style={styles.dropdown}
              placeholder="Select Location"
              containerStyle={styles.dropdownContainer}
            />
            <CustomModal
              visible={openLocation}
              onClose={() => setOpenLocation(false)}
              items={[
                { label: "Location A", value: "location_a" },
                { label: "Location B", value: "location_b" },
                { label: "Location C", value: "location_c" },
              ]}
              onSelect={setLocation}
              placeholder="Select Location"
            />
          </View>

          {/* Pickup Time */}
          <View>
            <Text style={styles.text}>Pickup Time</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={showTimePicker}
            >
              <Text style={styles.datePickerText}>
                {pickupTime || "Select Time"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Buttons at the Bottom */}
        <View style={styles.buttonContainer}>
          <BackButton onPress={() => navigation.goBack()} />
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
    position: "absolute",
    top: 0,
    width: width,
    zIndex: 1,
  },
  contentWrapper: {
    flex: 1,
    padding: 20,
    zIndex: 2,
    marginTop: 80,
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  wave: {
    height: height * 0.4,
    width: width,
  },
  stepText: {
    color: "white",
    fontSize: 14,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
    alignSelf: "flex-start",
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
  },
  datePickerButton: {
    backgroundColor: COLOR.primary,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    marginTop: 10,
  },
  datePickerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PickupScreen;
