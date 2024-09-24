import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Dimensions, Image} from 'react-native';
import images from '../../Constants/Images';
import COLOR from '../../Constants/Colors';


const { width } = Dimensions.get('window');

const HeroSection = () => {
  return (
    <View style={styles.heroContainer}>
      <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={images.bus_hero} style={styles.image} />
      </View>
      <View style={styles.sloganContainer}>
        <Text style={styles.slogan}>Hop On, We'll Handle the Rest</Text>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    flex: 1,
    paddingHorizontal:10,
    marginBottom:20,
  },
  container: {
    flexDirection: 'row',
    height: 150, // Adjust based on design needs
    borderRadius:20,
    backgroundColor:"#B3E5FC",
    paddingHorizontal:20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width / 2,
    height: '80%',
    resizeMode: 'cover',
  },
  sloganContainer: {
    flex: 1,
    padding: 20,
    textAlign:'left'
  },
  slogan: {
    fontSize: 20, // Increased font size for prominence
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center', // Center text alignment
    lineHeight: 32, // Improved line height for readability
    textShadowColor: '#FFF', // Light text shadow for contrast
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontStyle: 'italic',
  },
});

export default HeroSection;
