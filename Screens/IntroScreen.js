import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import images from "../Constants/Images";
import COLOR from "../Constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get("window");

const onboardingData = [
  {
    title: "Welcome",
    description: "Welcome to our awesome app!",
    image: images.bus,
    color: "#fff",
  },
  {
    title: "Quit Delay",
    description: "Quit waiting at the bus station to get a ticket",
    image: images.bus_stop,
    color: "#fff",
  },
  {
    title: "Get Started",
    description: "Get started with using the app today!",
    image: images.bus_arrival,
    color: "#fff",
  },
];

const IntroScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();

  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / screenWidth);
    setActiveIndex(currentIndex);
  };

  // Manually create dots for pagination
  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.passiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ScrollView for onboarding slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {onboardingData.map((item, index) => (
          <View key={index} style={[styles.slide, { width: screenWidth }]}>
            <Text
              onPress={() =>
                index < onboardingData.length - 1
                  ? scrollViewRef.current.scrollTo({
                      x: (index + 1) * screenWidth,
                      animated: true,
                    })
                  : navigation.navigate("HomeScreen")
              }
              style={styles.skip}
            >
              {index === onboardingData.length - 1 ? "Next" : "Skip"}
            </Text>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Dots for slide pagination */}
      {renderDots()}

      {/* Bottom section */}
      <View style={styles.bottom}>
        <View>
          <Text style={styles.bottomText}>
            Book your bus rides here in our app with ease
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.replace("HomeScreen")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bottom: {
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    gap: 40,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    backgroundColor: "#FFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 10,
    shadowRadius: 50,
    elevation: 15,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: COLOR.text,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLOR.primary,
    width: 25,
  },
  passiveDot: {
    backgroundColor: COLOR.primary,
    opacity: 0.3,
  },
  skip: {
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 18,
    color: COLOR.black,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: COLOR.secondary,
    padding: 20,
    borderRadius: 30,
    width: 300,
    alignItems: "center",
  },
  buttonText: {
    color: COLOR.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomText: {
    color: COLOR.text,
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

export default IntroScreen;
