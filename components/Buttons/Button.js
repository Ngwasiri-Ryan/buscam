import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions,Image } from 'react-native';
import COLOR from '../../Constants/Colors';
import { AntDesign } from '@expo/vector-icons'; 
import images from '../../Constants/Images';

const { width } = Dimensions.get('window');

const Button = ({text,onPress}) => {

  return (
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{text}</Text>
          <View style={styles.circleIcon}>
           <Image 
            source={images.right_arrow}
            style={styles.arrow}
            />
          </View>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        width:width*0.48,
        backgroundColor: COLOR.secondary,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        gap:25,
      },
      buttonText: {
        color: COLOR.buttonText,
        fontSize: 17,
        fontWeight: 'bold',
      },
      circleIcon: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: COLOR.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLOR.black,
      },
      arrow: {
        transform: [{ rotate: '30deg' }], 
        width:15,
        height:15,
      },
});

export default Button;
