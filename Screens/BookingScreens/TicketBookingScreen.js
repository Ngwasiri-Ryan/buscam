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

const TicketBookingScreen = ({ navigation , route }) => {
  const [openBusAgency, setOpenBusAgency] = useState(false);
  const [busAgency, setBusAgency] = useState(null);
  const [openTravelTime, setOpenTravelTime] = useState(false);
  const [travelTime, setTravelTime] = useState(null);
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [departureDate, setDepartureDate] = useState(null);
  const [openBusCategory, setOpenBusCategory] = useState(false);
  const [busCategory, setBusCategory] = useState(null);

  const { origin, destination } = route.params;

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDepartureDate(new Date(selectedDate).toLocaleDateString());
    }
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: handleDateChange,
      mode: "date",
      is24Hour: true,
    });
  };

  const handleNext = () => {
    // Navigate to InformationScreen and pass booking data as parameters
    navigation.navigate("InformationScreen", { 
      origin: origin,
      destination: destination, 
      busAgency, 
      busCategory, 
      numberOfTickets,
      travelTime,
      departureDate, });
};

  return (
    <View style={styles.container}>
      {/* Wave Image */}
      <View style={styles.imageContainer}>
        <Image width={width} style={styles.wave1} source={images.wave} />
      </View>

      {/* Screen Content */}
      <View style={styles.contentWrapper}>
        <View>
          <Text style={styles.stepText}>Step 2 of 4</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Book Your Ticket</Text>

          {/* Dropdown for Bus Agency */}
          <View>
            <Text style={styles.text}>Select Bus Agency</Text>
            <DropDownPicker
              open={openBusAgency}
              value={busAgency}
              items={[
                { label: "Musango", value: "musango" },
                { label: "Amour Mezam", value: "amour mezam" },
                { label: "Moghamo", value: "moghamoo" },
                { label: "Fevor Travels", value: "fevor travels"},
              ]}
              setOpen={setOpenBusAgency}
              setValue={setBusAgency}
              style={styles.dropdown}
              placeholder="Select Bus Agency"
              containerStyle={styles.dropdownContainer}
            />
            <CustomModal
              visible={openBusAgency}
              onClose={() => setOpenBusAgency(false)}
              items={[
                { label: "Musango", value: "musango" },
                { label: "Amour Mezam", value: "amour mezam" },
                { label: "Moghamo", value: "moghamoo" },
                { label: "Fevor Travels", value: "fevor travels"},
              ]}
              onSelect={setBusAgency}
              placeholder="Select Bus Agency"
            />
          </View>

          {/* Dropdown for Bus Category */}
          <View>
            <Text style={styles.text}>Select Bus Category</Text>
            <DropDownPicker
              open={openBusCategory}
              value={busCategory}
              items={[
                { label: "VIP", value: "vip" },
                { label: "Normal", value: "normal" },
              ]}
              setOpen={setOpenBusCategory}
              setValue={setBusCategory}
              style={styles.dropdown}
              placeholder="Select Bus Category"
              containerStyle={styles.dropdownContainer}
            />
            <CustomModal
              visible={openBusCategory}
              onClose={() => setOpenBusCategory(false)}
              items={[
                { label: "VIP", value: "vip" },
                { label: "Normal", value: "normal" },
              ]}
              onSelect={setBusCategory}
              placeholder="Select Bus Category"
            />
          </View>

          {/* Number of Tickets */}
          <View style={styles.ticketsContainer}>
            <Text style={styles.text}>Number of Tickets</Text>
            <View style={styles.ticketHolder}>
              <View style={styles.ticketsControls}>
                <Text style={styles.numberDisplay}>{numberOfTickets}</Text>
              </View>
              <View style={styles.controlsContainer}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() =>
                    setNumberOfTickets((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                >
                  <Text style={styles.controlButtonText}>-</Text>
                </TouchableOpacity>
                <View style={styles.stroke}>
                  <Text style={styles.strokeText}>|</Text>
                </View>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => setNumberOfTickets((prev) => prev + 1)}
                >
                  <Text style={styles.controlButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Travel Time */}
          <View>
            <Text style={styles.text}>Travel Time</Text>
            <DropDownPicker
              open={openTravelTime}
              value={travelTime}
              items={[
                { label: "Morning", value: "morning" },
                { label: "Afternoon", value: "afternoon" },
                { label: "Night", value: "night" },
              ]}
              setOpen={setOpenTravelTime}
              setValue={setTravelTime}
              style={styles.dropdown}
              placeholder="Select Travel Time"
              containerStyle={styles.dropdownContainer}
            />
            <CustomModal
              visible={openTravelTime}
              onClose={() => setOpenTravelTime(false)}
              items={[
                { label: "Morning", value: "morning" },
                { label: "Afternoon", value: "afternoon" },
                { label: "Night", value: "night" },
              ]}
              onSelect={setTravelTime}
              placeholder="Select Travel Time"
            />
          </View>

          {/* Departure Date */}
          <View>
            <Text style={styles.text}>Departure Date</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={showDatePicker}
            >
              <Text style={styles.datePickerText}>
                {departureDate || "Select Date"}
              </Text>
            </TouchableOpacity>
          </View>

    {/* Buttons at the Bottom */}
     <View style={styles.buttonContainer}>
          <BackButton onPress={() => navigation.replace("ServiceScreen")} />
          <Button text="Next" onPress={handleNext} />
        </View>
          
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
    height:height*0.1,
  },
  contentWrapper: {
    flex: 1,
    padding: 20,
    zIndex: 2,
    marginTop:20,
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  stroke: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  strokeText: {
    fontSize: 30,
  },
  controlsContainer: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: COLOR.primary,
    borderRadius: 20,
  },
  wave: {
    height: height * 0.4,
    width: width,
    tintColor:COLOR.primary,
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
  ticketHolder: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  ticketsContainer: {
    marginBottom: 20,
    width: 200,
  },
  ticketsControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLOR.text,
    borderRadius: 8,
    width: "100%",
  },
  controlButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
  },
  controlButtonText: {
    fontSize: 24,
    color: "black",
  },
  numberDisplay: {
    fontSize: 18,
    color: "black",
    width: 50,
    textAlign: "center",
    justifyContent: "center",
    height: 50,
    paddingTop: 12,
  },
  datePickerButton: {
    backgroundColor: COLOR.secondary,
    padding: 15,
    borderRadius: 8,
  },
  datePickerText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    top:40,
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TicketBookingScreen;
