import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLOR from '../../Constants/Colors';

const Footer = () => {
  return (
    <View style={styles.footer}>
       <Text style={styles.footerText}>Privacy  •   Security  •   Copyrights</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,

  },
  footerText: {
    fontSize: 12,
    color: COLOR.text,
  },
});

export default Footer;
