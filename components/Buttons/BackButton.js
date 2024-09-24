import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions,Image } from 'react-native';
import COLOR from '../../Constants/Colors';
import images from '../../Constants/Images';

const { width } = Dimensions.get('window');

const BackButton = ({onPress}) => {

  return (
    <TouchableOpacity style={styles.cancelButton} onPress={onPress}>
     <Image source={images.right_arrow} style={styles.icon}/>
   </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    cancelButton: {
        flex: 1,
        paddingVertical: 2,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent:'center',
        marginRight: 70,
        borderWidth:1,
        borderColor:COLOR.black,
      },
      buttonText: {
        color: COLOR.black,
        fontSize: 15,

      },
      icon:{
        height:20,
        width:20,
        transform: [{ rotate: '180deg' }], 
      }
});

export default BackButton;
