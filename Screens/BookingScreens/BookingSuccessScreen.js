import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { StatusBar } from "expo-status-bar";
import COLOR from "../../Constants/Colors";
import images from "../../Constants/Images";

const BookingSuccessScreen = ({ navigation }) => {
  const confettiRef = useRef(null);

  useEffect(() => {
    confettiRef.current.start();
  }, []);

  const handleGoHome = () => {
    navigation.replace("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Success Icon */}
      <Image
        source={images.celebrate}
        style={styles.successImage}
      />

      {/* Success Message */}
      <Text style={styles.title}>Booking Confirmed!</Text>
      <Text style={styles.message}>
        Thank you for choosing our service! We will get to you on your Whatsapp shortly.
      </Text>

      {/* Button to go back to home */}
      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>

      {/* Confetti Cannon */}
      <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: width / 2, y: 0 }}
        fadeOut={true}
        explosionSpeed={350}
        fallSpeed={3000}
      />
       <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: width / 2, y: 0 }}
        fadeOut={true}
        explosionSpeed={350}
        fallSpeed={3000}
      />
      <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: width / 2, y: 0 }}
        fadeOut={true}
        explosionSpeed={350}
        fallSpeed={3000}
      />
       <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: width / 2, y: 0 }}
        fadeOut={true}
        explosionSpeed={350}
        fallSpeed={3000}
      />
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF", // Light background color (AliceBlue)
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  successImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: COLOR.primary, // Primary color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BookingSuccessScreen;
