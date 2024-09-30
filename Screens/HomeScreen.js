import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import images from "../Constants/Images";
import COLOR from "../Constants/Colors";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation , route}) => {
  const { username } = route.params;
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const firstTwoLetters = username.slice(0, 2).toUpperCase();

  const carouselItems = [
    {
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "John Doe",
      comment: "Great service! Had an amazing experience with the bus rides.",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Jane Smith",
      comment:
        "Very reliable and comfortable buses. Would definitely recommend!",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Mike Johnson",
      comment: "Punctual and affordable! Highly satisfied with the service.",
    },
  ];

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slideIndex);
  };

  return (
    <View style={styles.container}>
      {/* Profile Circle at Top-Left */}
      <TouchableOpacity
        style={styles.profileCircle}
        onPress={() => navigation.navigate("ProfileScreen",{username})}
      >
          <Text style={styles.profileText}>{firstTwoLetters}</Text>
      </TouchableOpacity>
      <View style={styles.back}>
        <View style={{ gap: 15, alignItems: "flex-end" }}>
          <Text style={styles.heading}>Get your bus rides</Text>
          <Image source={images.bus_icon} style={styles.bus_icon} />
        </View>
        <Image source={images.bus_img} style={styles.image} />
      </View>

      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16} // Ensures smooth scrolling
        >
          {carouselItems.map((item, index) => (
            <View key={index} style={styles.reviewCard}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.comment}>{item.comment}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Get Started Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("ServiceScreen")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <View style={styles.circleIcon}>
            <Image source={images.right_arrow} style={styles.arrow} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <Text
          style={styles.footerText}
          onPress={() => navigation.replace("ContactScreen")}
        >
          Have a question?
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
  image: {
    width: 350,
    height: 300,
    position: "absolute",
    top: height * 0.2,
  },
  profileCircle: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // Ensures it is on top
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  profileText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLOR.black,
  },
  back: {
    backgroundColor: "#B3E5FC",
    height: "40%",
    width: "100%",
    position: "relative",
    paddingTop: 60,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLOR.black,
    top: -20,
  },
  bus_icon: {
    height: 50,
    width: 50,
    tintColor: COLOR.black,
  },
  carouselContainer: {
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
    top: height * 0.18,
  },
  reviewCard: {
    backgroundColor: COLOR.background,
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    width: width * 0.7,
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    margin: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginBottom: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  comment: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
  buttonContainer: {
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    top: height * 0.19,
  },
  button: {
    width: width * 0.8,
    padding: 15,
    backgroundColor: COLOR.secondary,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: COLOR.buttonText,
    fontSize: 20,
    fontWeight: "bold",
  },
  circleIcon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: COLOR.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLOR.black,
  },
  arrow: {
    transform: [{ rotate: "30deg" }],
    width: 15,
    height: 15,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLOR.secondary,
    width: 20,
  },
  inactiveDot: {
    backgroundColor: COLOR.secondary,
    opacity: 0.3,
  },
  footerContainer: {
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    top: height * 0.18,
  },
  footerText: {
    fontSize: 16,
    color: COLOR.black,
    borderRadius: 30,
    top: -10,
  },
});

export default HomeScreen;
