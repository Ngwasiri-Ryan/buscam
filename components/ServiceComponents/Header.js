import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import COLOR from "../../Constants/Colors";
import images from "../../Constants/Images";

const { width } = Dimensions.get("window");

// Function to determine greeting based on the time of day
const getGreeting = () => {
  const hours = new Date().getHours();
  if (hours < 12) return "Good Morning";
  if (hours < 18) return "Good Afternoon";
  return "Good Evening";
};

// Function to get an icon representing the time of day
const getTimeOfDayIcon = () => {
  const hours = new Date().getHours();
  if (hours < 12) return images.morning; // Morning
  if (hours < 18) return images.afternoon; // Afternoon
  return images.evening; // Evening
};

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.textContainer}>
        <View style={styles.greetingContainer}>
          <Image source={getTimeOfDayIcon()} style={styles.icon} />
          <Text style={styles.greeting}>{getGreeting()}</Text>
        </View>
        <View style={styles.heading}>
          <Image source={require("../../assets/splash.png")} style={styles.logo} />
          <Text style={styles.heroTitle}>Welcome to BusCam</Text>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight + 10, // Adjust padding for status bar
    paddingBottom: 10,
    backgroundColor: COLOR.background, // Background color for the header
    borderBottomColor: COLOR.border, // Border color for separation
  },
  heading:{
   display:'flex',
   flexDirection:'row',
   gap:10,
   alignItems:'center'
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  greeting: {
    fontSize: 18,
    color:COLOR.text,
  },
  heroTitle: {
    fontSize: 23,
    fontWeight: "700",
    marginBottom: 5,
  },
  heroSubtitle: {
    fontSize: 16,
    marginVertical: 5,
  },
  logo: {
    width: 40,
    height: 40,
  },
  heroSubtitle:{
    fontSize:14,
    top:3,
  }
});

export default Header;
