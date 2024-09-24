import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import COLOR from "../../Constants/Colors";
import Button from "../../components/Buttons/Button";
import BackButton from "../../components/Buttons/BackButton";
import CustomModal from "../../components/Modal/CustomModal";
import images from "../../Constants/Images";

const { width, height } = Dimensions.get("window");

const TicketSummaryScreen = ({ navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleNext = () => {
    navigation.navigate("BookingSuccessScreen");
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
          <Text style={styles.stepText}>Step 4 of 4</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Ticket Summary</Text>

          {/* Blur Effect */}
          <BlurView intensity={100} style={styles.infoContainer}>
            {/**Travel Agency */}
            <View style={styles.input}>
              <Text style={styles.small}>Travel Agency</Text>
              <Text style={styles.large}>Amour Mezam</Text>
            </View>

            {/**Travel Destination */}
            <View style={styles.input}>
              <Text style={styles.small}>Travel Destination</Text>
              <Text style={styles.large}>Buea - Bamenda</Text>
            </View>

            {/**Travel Date and time */}
            <View style={styles.flex}>
              <View style={styles.inputFlex}>
                <Text style={styles.small}>Travel Date</Text>
                <Text style={styles.large}>2024-08-2024</Text>
              </View>
              <View style={styles.inputFlex}>
                <Text style={styles.small}>Travel Time</Text>
                <Text style={styles.large}>24-08-2024</Text>
              </View>
            </View>

            {/**Full Name */}
            <View style={styles.input}>
              <Text style={styles.small}>Full Name</Text>
              <Text style={styles.large}>John Snow</Text>
            </View>

            {/**Phone Number */}
            <View style={styles.input}>
              <Text style={styles.small}>Phone Number</Text>
              <Text style={styles.large}>+237 67524524</Text>
            </View>

            {/**Booking Fee*/}
            <View style={styles.input}>
              <Text style={styles.small}>Booking Fee</Text>
              <Text style={styles.large}>500FCFA</Text>
            </View>

            {/**ticket price and ticket number */}
            <View style={styles.flex}>
              <View style={styles.inputFlex}>
                <Text style={styles.small}>Total Price</Text>
                <Text style={styles.large}>500FCFA</Text>
              </View>
              <View style={styles.inputFlex}>
                <Text style={styles.small}>Number of Tickets</Text>
                <Text style={styles.large}>1</Text>
              </View>
            </View>

            {/**total cost*/}
            <View style={styles.input}>
              <Text style={styles.small}>Total cost</Text>
              <Text style={styles.large}>6,500FCFA</Text>
            </View>
          </BlurView>
        </View>
      </View>

      {/* Hide the Button Container when the keyboard is visible */}
      {!isKeyboardVisible && (
        <View style={styles.buttonContainer}>
          <BackButton onPress={() => navigation.replace("ServiceScreen")} />
          <Button text="Next" onPress={handleNext} />
        </View>
      )}
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
    marginTop: 40,
  },
  contentContainer: {
    justifyContent: "flex-start",
  },
  infoContainer: {
    padding: 10,
    borderRadius: 20,
    borderColor: COLOR.text,
    borderWidth: 1,
    overflow: "hidden",
  },
  stepText: {
    color: "white",
    fontSize: 14,
  },
  wave: {
    height: height * 0.4,
    width: width,
    tintColor: COLOR.secondary,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  input: {
    borderColor: COLOR.secondary,
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 7,
    fontWeight: "bold",
    fontSize: 15,
    cursorColor: COLOR.primary,
    backgroundColor: "rgba(135, 206, 235, 0.2)",
  },
  inputFlex: {
    borderColor: COLOR.secondary,
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 7,
    fontWeight: "bold",
    fontSize: 15,
    width: "50%",
    backgroundColor: "rgba(135, 206, 235, 0.2)",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    width: "100%",
  },
  small: {
    fontSize: 13,
    marginBottom: 2,
    color: COLOR.text,
  },
  large: {
    fontSize: 17,
    color: COLOR.text,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 20,
  },
});

export default TicketSummaryScreen;
