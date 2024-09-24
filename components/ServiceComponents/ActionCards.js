import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ActionCard = ({ title, imageSource, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image source={imageSource} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 5,
    padding: 20,
    alignItems: 'center',
    elevation: 5, // Shadow effect
  },
  cardImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ActionCard;
