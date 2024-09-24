import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import COLOR from '../Constants/Colors';
import images from '../Constants/Images';
import Footer from '../components/ServiceComponents/Footer';

const ContactScreen = ({ navigation }) => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:contact@company.com');
  };

  const handleWhatsAppPress = () => {
    Linking.openURL('whatsapp://send?phone=1234567890');
  };

  const handleCallPress = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleBackPress = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <MaterialIcons name="arrow-back" size={28} color={COLOR.primary} />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Image source={images.contact} style={styles.headerImage} />
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subTitle}>We're here to help you!</Text>
      </View>

      {/* Contact Options */}
      <View style={styles.contactOptions}>
        {/* Email */}
        <TouchableOpacity style={styles.option} onPress={handleEmailPress}>
          <FontAwesome5 name="envelope" size={30} color={COLOR.secondary} />
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Email Us</Text>
            <Text style={styles.optionSubTitle}>contact@company.com</Text>
          </View>
        </TouchableOpacity>

        {/* WhatsApp */}
        <TouchableOpacity style={styles.option} onPress={handleWhatsAppPress}>
          <FontAwesome name="whatsapp" size={30} color={COLOR.success} />
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>WhatsApp</Text>
            <Text style={styles.optionSubTitle}>+123 456 7890</Text>
          </View>
        </TouchableOpacity>

        {/* Phone Call */}
        <TouchableOpacity style={styles.option} onPress={handleCallPress}>
          <MaterialIcons name="phone" size={30} color={COLOR.primary} />
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Call Us</Text>
            <Text style={styles.optionSubTitle}>+123 456 7890</Text>
          </View>
        </TouchableOpacity>

        
      </View>
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerImage: {
    width: 250,
    height: 250,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLOR.secondary,
  },
  subTitle: {
    fontSize: 16,
    color: COLOR.text,
    marginTop: 10,
    textAlign: 'center',
  },
  contactOptions: {
    gap: 25,
    marginBottom:15,
  },
  option: {
    flexDirection: 'row',
    gap: 5,
    height: 80,
    alignItems: 'center',
    backgroundColor: '#ffff',
    borderRadius: 20,
    padding: 20,
    // Shadow styles for iOS and Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Android elevation
  },
  optionText: {
    marginLeft: 20,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.text,
  },
  optionSubTitle: {
    fontSize: 14,
    color: COLOR.secondaryText,
  },
});

export default ContactScreen;
