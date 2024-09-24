import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions,Image } from 'react-native';
import COLOR from '../../Constants/Colors';

const { width } = Dimensions.get('window');

const CancelButton = ({onPress}) => {

  return (
    <TouchableOpacity style={styles.cancelButton} onPress={onPress}>
    <Text style={styles.buttonText}>Cancel</Text>
   </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    cancelButton: {
        flex: 1,
        paddingVertical: 5,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent:'center',
        marginRight: 10,
        borderWidth:1,
        borderColor:COLOR.black,
      },
      buttonText: {
        color: COLOR.black,
        fontSize: 15,
      },
});

export default CancelButton;
