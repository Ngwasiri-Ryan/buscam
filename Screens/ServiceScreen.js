import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Header from '../components/ServiceComponents/Header';
import HeroSection from '../components/ServiceComponents/HeroSection';
import ActionCard from '../components/ServiceComponents/ActionCards';
import Footer from '../components/ServiceComponents/Footer';
import images from '../Constants/Images';

const { width , height } = Dimensions.get('window');

const ServiceScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header />
      <HeroSection/>
      <Text style={styles.heroSubtitle}>What would you like to do today?</Text>
     <View/>
      <View style={styles.cardsContainer}>
        <ActionCard
          title="Buy a bus ticket"
          imageSource={images.bus_ticket}
          onPress={() => navigation.navigate('TravelRouteScreen')}
        />
        {/* <ActionCard
          title="Rent a car"
          imageSource={images.hire_bus}
          onPress={() => console.log('Rent a Car selected')}
        /> */}
        <ActionCard
          title="Arrange Pickup"
          imageSource={images.pickup}
          onPress={() => navigation.navigate('PickupScreen')}
          style={styles.card} 
        />
      </View>
     
    
      <Footer
        onHomePress={() => console.log('Home pressed')}
        onBookingsPress={() => console.log('Bookings pressed')}
        onProfilePress={() => console.log('Profile pressed')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    gap:10,
  },
  cardsContainer: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',               
    justifyContent: 'space-between', 
    paddingHorizontal: 15,           
    paddingVertical: 10,   
    top:-20,          
  },
  cardsContainer1: {
    flex: 2,
    flexDirection: 'row',            
    justifyContent: 'space-between', 
    paddingRight:width*0.45, 
    marginHorizontal:10,  
    height:height * 0.3, 
    marginTop:-30,   
  },
  heroSubtitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default ServiceScreen;
