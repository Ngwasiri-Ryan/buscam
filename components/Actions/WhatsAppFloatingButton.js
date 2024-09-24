import React from 'react';
import { View, TouchableOpacity, Linking, StyleSheet, Dimensions, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import COLOR from '../../Constants/Colors';

const { width, height } = Dimensions.get('window'); 

const WhatsAppFloatingButton = () => {
  const handleWhatsAppPress = () => {
    Linking.openURL('whatsapp://send?phone=1234567890'); 
  };
  return (
    <View style={[styles.container, { right: width * 0.05 }]}>
      <TouchableOpacity style={styles.floatingButton} onPress={handleWhatsAppPress}>
        <FontAwesome name="whatsapp" size={25} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.label}>Get Services</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: height*0.6,
    right:0,
    alignItems: 'center',
    zIndex: 100, 
  },
  floatingButton: {
    width: 40,
    height: 40,
    borderRadius: 30, 
    backgroundColor: COLOR.success, 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, 
  },
  label: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: 'bold',
    color: COLOR.text,
    textAlign: 'center',
  },
});

export default WhatsAppFloatingButton;
