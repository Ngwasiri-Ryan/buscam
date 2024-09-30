import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import COLOR from '../../Constants/Colors';

const LoadingIndicator = ({ message = "Loading..." }) => {
  return (
      <ActivityIndicator size="large" color={COLOR.background} />
  );
};

const styles = StyleSheet.create({
 
});

export default LoadingIndicator;
